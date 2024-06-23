"""CV routers"""
from fastapi import APIRouter, Depends, File, UploadFile, status
from config.security import JWTBearer, get_current_user_id
from schemas.CVSchemas import CVCreateSchema, CVFirstSchema, CVSchema, CVAllSchema, CVUpdateSchema
from services.CVService import CVService


router = APIRouter(dependencies=[Depends(JWTBearer())])


@router.get(
    "/{cv_id}",
    response_model=CVSchema,
    status_code=status.HTTP_200_OK,
    summary="Get details of a CV by its ID",
)
def get_cv_by_id(
    cv_id: int,
    user_id: int = Depends(get_current_user_id),
    cv_service: CVService = Depends(),
):
    """
    Retrieve details of a CV by its ID.
    """
    return cv_service.get_cv_by_id(cv_id, user_id)


@router.get(
    "",
    response_model=list[CVSchema],
    status_code=status.HTTP_200_OK,
    summary="Get all CVs associated with the current user",
)
def get_all_cv(
    user_id: int = Depends(get_current_user_id),
    cv_service: CVService = Depends(),
):
    """
    Retrieve all CVs associated with the current user.
    """
    return cv_service.get_all_cvs(user_id)


@router.get(
    "/all/{cv_id}",
    response_model=CVAllSchema,
    status_code=status.HTTP_200_OK,
    summary="Get all details of a CV by its ID",
)
def get_cv_all(
    cv_id: int,
    user_id: int = Depends(get_current_user_id),
    cv_service: CVService = Depends(),
):
    """
    Retrieve all details of a CV by its ID.
    """
    return cv_service.get_cv_all(cv_id, user_id)


@router.post(
    "",
    response_model=dict,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new CV",

)
def create_cv(
    cv_request: CVCreateSchema,
    user_id: int = Depends(get_current_user_id),
    cv_service: CVService = Depends(),
):
    """
    Create a new CV.
    """
    return cv_service.create_cv(cv_request, user_id)


@router.post(
    "/first",
    response_model=dict,
    status_code=status.HTTP_201_CREATED,
    summary="Create an empty CV with a title",

)
def create_empty_cv(
    title: CVFirstSchema,
    user_id: int = Depends(get_current_user_id),
    cv_service: CVService = Depends(),
):
    """
    Create an empty CV with a title.
    """
    return cv_service.create_empty_cv(title, user_id)


@router.put(
    "",
    response_model=dict,
    status_code=status.HTTP_200_OK,
    summary="Update an existing CV",

)
def update_cv(
    cv_request: CVUpdateSchema,
    user_id: int = Depends(get_current_user_id),
    cv_service: CVService = Depends(),
):
    """
    Update an existing CV.
    """
    return cv_service.update_cv(cv_request, user_id)


@router.patch(
    "/{cv_id}",
    response_model=dict,
    status_code=status.HTTP_200_OK,
    summary="Upload a picture for a CV",

)
async def upload_picture(
    cv_id: int,
    file: UploadFile = File(...),
    user_id: int = Depends(get_current_user_id),
    cv_service: CVService = Depends(),
):
    """
    Upload a picture for a CV.
    """
    return await cv_service.upload_picture(cv_id, user_id, file)


@router.patch(
    "/{cv_id}/template/{template_id}",
    response_model=dict,
    status_code=status.HTTP_200_OK,
    summary="Update the template ID of a CV",

)
async def update_template_id(
    cv_id: int,
    template_id: int,
    user_id: int = Depends(get_current_user_id),
    cv_service: CVService = Depends(),
):
    """
    Update the template ID of a CV.
    """
    return cv_service.update_template_id(cv_id, template_id, user_id)


@router.delete(
    "/{cv_id}",
    response_model=dict,
    status_code=status.HTTP_200_OK,
    summary="Delete a CV by its ID",

)
def delete_cv(
    cv_id: int,
    user_id: int = Depends(get_current_user_id),
    cv_service: CVService = Depends(),
):
    """
    Delete a CV by its ID.
    """
    return cv_service.delete_cv(cv_id, user_id)
