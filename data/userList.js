userList = [
	{
		"_id": "c5d0fd67-7977-4fc5-9088-33d0347c932b",
		"age": 21,
		"username": "Taleen",
		"password": "PutHere"
  },
  {
		"_id": "c5d0dd67-7977-4fc5-9088-33d0347c932c",
		"age": 30,
		"username": "Barresi",
		"password": "PutHere"
	}  
]

module.exports = {userList};

/* The reason why there are plain text passwords in this file is because this
file is supposed to emulate users creating accounts when the seeding script is
run. We understand that we are not supposed to store any passwords in plain text, 
but our function that handles creating a new user hashes the passwords with bcrypt
before storing them. Thus, if we were to include hashed passwords in this file,
the passwords would no longer work, as they would be subject to another round of
hashing. For any user that actually creates an account using CHUGGED, their
password will never be directly stored or put in plain text. */