import logging
from typing import Callable

class AppLogger(dict):
    """dot.notation access to dictionary attributes"""
    __getattr__: Callable = dict.get
    __setattr__ = dict.__setitem__
    __delattr__ = dict.__delitem__

logger = AppLogger({
        "i": logging.getLogger("uvicorn").info,
        "e": logging.getLogger("uvicorn").error,
        "d": logging.getLogger("uvicorn").error
})
