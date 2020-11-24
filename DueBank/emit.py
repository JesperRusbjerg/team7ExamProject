from rabbitFacade import send
from bankSettings import exchange
import json

request = {
    'loanType': 'quick',
    'amount': 20000,
    'creditScore': 95,
    'uid': 'lgpx6it34lT43Xglp7tXTGLxltg6tX43GL6',
    'responseChannel': 'loanResponse'
}
message = json.dumps(request, indent=4)
send(exchange, message)
