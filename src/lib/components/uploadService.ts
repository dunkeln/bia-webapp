interface UploadResponse {
  success: boolean;
  error?: string;
  files?: string[];
}

export async function uploadFiles(formData: FormData): Promise<UploadResponse> {
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || 'Upload failed'
      };
    }

    const result = await response.json();
    return {
      success: true,
      files: result.files
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: 'Network error occurred'
    };
  }
}
