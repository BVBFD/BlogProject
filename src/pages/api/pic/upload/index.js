import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'myportfolioblogproject',
    format: async (req, file) => 'gif',
    public_id: (req, file) => req.filename,
  },
});

const upload = multer({ storage });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await upload.single('file')(req, res);

      // 이 부분에서 CORS 관련 헤더를 설정할 수 있습니다.
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

      // 업로드된 파일의 경로를 클라이언트에게 반환합니다.
      res.status(200).json({ path: req.file.path });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '파일 업로드 중에 오류가 발생했습니다.' });
    }
  } else {
    res.status(405).json({ error: '허용되지 않는 메서드입니다.' });
  }
}
