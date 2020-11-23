from bankSettings import bankName, exchange
from rabbitFacade import subscribe

def callback(ch, method, properties, body):
    print('{} {} {} {}'.format(ch, method, properties, body))


def setupBank():
    print('Starting {}'.format(bankName))
    subscribe(exchange, callback)

def main():
    setupBank()

if __name__ == '__main__':
    main()
