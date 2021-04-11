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

deploy 2nd migration to rinkeby:
truffle migrate --reset --network rinkeby -f 2

Verify contract on etherscan:
truffle run verify RealEstateNFT --network rinkeby --license MIT

create-metadata:
truffle exec scripts/create-metadata.js --network rinkeby

START APP:
npm run start
