const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Use memory storage for file uploads
const storage = multer.memoryStorage();

// File filter to only allow certain file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'), false);
  }
};

// Multer configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Helper function to sanitize filenames
function sanitizeFileName(filename) {
  // Remove special characters and spaces, keep only alphanumeric, dots, and hyphens
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '-')
    .replace(/--+/g, '-')  // Replace multiple consecutive hyphens with single hyphen
    .toLowerCase();
}

// Helper function to upload files to Supabase
const uploadToSupabase = async (file, bucket = 'Social Media Task') => {  
  try {
    const timestamp = Date.now();
    const sanitizedFileName = sanitizeFileName(file.originalname);
    const fileName = `submissions/${timestamp}-${sanitizedFileName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (error) throw error;

    // Get public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Supabase upload error:', error);
    throw new Error('Error uploading file to Supabase');
  }
};

module.exports = { upload, uploadToSupabase };