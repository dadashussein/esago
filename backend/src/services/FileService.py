import uuid

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
