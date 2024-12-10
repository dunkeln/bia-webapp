import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fs from 'fs/promises';
import path from 'path';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const formData = await request.formData();
    const videos = formData.getAll('videos') as File[];

    if (!videos || videos.length === 0) {
      throw error(400, 'No files uploaded');
    }

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'uploads', 'videos');
    await fs.mkdir(uploadDir, { recursive: true });

    const uploadedFiles: string[] = [];

    for (const video of videos) {
      // Validate file type (optional, but recommended)
      if (!video.type.startsWith('video/')) {
        throw error(400, `Invalid file type: ${video.type}`);
      }

      // Generate unique filename
      const filename = `${Date.now()}-${video.name}`;
      const filePath = path.join(uploadDir, filename);

      // Write file to disk
      const buffer = await video.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(buffer));

      uploadedFiles.push(filename);
    }

    return json({
      message: 'Files uploaded successfully',
      files: uploadedFiles
    });
  } catch (err) {
    console.error('Upload error:', err);
    throw error(500, 'File upload failed');
  }
};
