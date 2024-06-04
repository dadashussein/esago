from dataclasses import asdict
from typing import Any, Type
from pydantic import BaseModel


def map_schema_to_model(schema_instance: BaseModel, model_class: Type) -> Any:
    """
    Maps the attributes of a schema instance to a model instance.
    :param schema_instance: An instance of the schema.
    :param model_class: The model class to map to.
    :return: An instance of the model class with attributes mapped from the schema instance.
    """
    # Convert the schema instance to a dictionary
    schema_dict = asdict(schema_instance)

    # Initialize an instance of the model class
    model_instance = model_class()

    # Map attributes from the schema to the model
    for field, value in schema_dict.items():
        if hasattr(model_instance, field):
            setattr(model_instance, field, value)

    return model_instance