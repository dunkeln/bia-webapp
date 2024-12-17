import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import FormData from 'form-data';
import { PUBLIC_URL } from '$env/static/public';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const formData = await request.formData();
    const videos = formData.getAll('videos') as File[];

    if (!videos || videos.length === 0) {
      throw error(400, 'No files uploaded');
    }

    const uploadDir = path.join(process.cwd(), 'uploads', 'videos');
    await fsp.mkdir(uploadDir, { recursive: true });

    const uploadedFiles: string[] = [];

    for (const video of videos) {
      if (!video.type.startsWith('video/')) {
        throw error(400, `Invalid file type: ${video.type}`);
      }

      const filename = `${Date.now()}-${video.name}`;
      const filePath = path.join(uploadDir, filename);

      const buffer = await video.arrayBuffer();
      await fsp.writeFile(filePath, Buffer.from(buffer));

      uploadedFiles.push(filePath);
    }

    const apiFormData = new FormData();

    for (const filePath of uploadedFiles) {
      console.log(filePath);
      const filesStream = fs.createReadStream(filePath);

      apiFormData.append('interviews', filesStream, path.basename(filePath));
    }

    console.info(apiFormData.getHeaders());

    const resp = await fetch(`${PUBLIC_URL}/video/`, {
      method: 'POST',
      headers: apiFormData.getHeaders(),
      body: apiFormData,
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      throw error(500, `External API error: ${errorText}`);
    }

    for (const filePath of uploadedFiles) {
      await fsp.unlink(filePath);
    }

    const responseData = await resp.json();

    return json({
      message: 'Files uploaded and forwarded successfully',
      files: uploadedFiles.map((file) => path.basename(file)),
      apiResponse: responseData,
    });
  } catch (err) {
    console.error('Upload error:', err);
    throw error(500, 'File upload failed');
  }
};

