import uuid
from config.config import configs
import aiofiles


def get_change_file_name(file):
    file.filename = uuid.uuid4().hex + f".{file.filename.split('.')[-1]}"
    return file


class FileService:

    @staticmethod
    async def upload(file, path):
        path.mkdir(parents=True, exist_ok=True)
        file = get_change_file_name(file)
        file_path = path / file.filename
        async with aiofiles.open(file_path, "wb") as buffer:
            data = await file.read()
            await buffer.write(data)
        return str(file.filename)
    
    @staticmethod
    async def delete(file_path):
        if file_path is None:
            return {"message": "File not found"}
        try:
            path = configs.UPLOAD_PROFILE_DIR / file_path
            if path.exists():
                path.unlink()
            return {"message": "File deleted successfully"}
        except Exception as e:
            return {"message": "File not found"}