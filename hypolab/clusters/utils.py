import hashlib
import uuid

from .models import HypoCluster

def generate_hashed_id(length=8, max_retries=5):
    unique_id = str(uuid.uuid4())  
    hashed = hashlib.sha1(unique_id.encode()).hexdigest()[:length]  


    attempt = 0
    new_id = hashed
    while attempt < max_retries:
        if not id_exists_in_db(new_id):
            return new_id
        attempt += 1
        suffix = str(attempt)
        new_id = f"{hashed[:length-len(suffix)]}{suffix}"

    return str(uuid.uuid4())[:length]

def id_exists_in_db(hashed_id):

    return HypoCluster.objects.filter(id=hashed_id).exists()
