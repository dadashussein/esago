class Response:
    def __init__(self, status_code: int, detail: str):
        self.status_code = status_code
        self.detail = detail

class SuccessResponse(Response):
    def __init__(self, detail: str):
        super().__init__(status_code=200, detail=detail)

class ErrorResponse(Response):
    def __init__(self, detail: str):
        super().__init__(status_code=400, detail=detail)