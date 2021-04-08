# RealEstateRoyalties
Chainlink Hackathon Submission

required:
- Node
- Ganache
- Metamask (Chrome extension)

install truffle:
npm install -g truffle

install dependencies:
npm install

compile contracts:
truffle compile

deploy contracts:
truffle migrate

deploy to rinkeby:
truffle migrate --reset --network rinkeby 

Verify contract on etherscan:
truffle run verify contractName --network rinkeby --license MIT

START APP:
npm run start
