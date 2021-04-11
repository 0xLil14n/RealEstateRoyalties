const NFTitle = artifacts.require('RealEstateNFT')
const fs = require('fs')

const metadataTemple = {
    "name": "",
    "description": "",
    "image": "",
    "attributes": [
        {
            "trait_type": "landDescription",
            "value": ""
        },
        {
            "trait_type": "propertyAddress",
            "value": ""
        }
    ]
}
module.exports = async callback => {
    const deployedNFTitle = await NFTitle.deployed()
    length = await deployedNFTitle.getNumberOfProperties()
    index = 0
    while (index < length) {
        console.log('Let\'s get the overview of your property ' + index + ' of ' + length)
        let nfTitleMetadata = metadataTemple

//        let property = await deployedNFTitle.properties[index]

        let property = deployedNFTitle.getPropertyMetadata[0];
        console.log('propertytyyt', property);
        index++
        nfTitleMetadata['name'] = property['name']
        if (fs.existsSync('metadata/' + nfTitleMetadata['name'].toLowerCase().replace(/\s/g, '-') + '.json')) {
            console.log('test')
            continue
        }
        console.log(nfTitleMetadata['name'])
        nfTitleMetadata['attributes'][0]['value'] = nfTitle['landDescription']['words'][0]
        nfTitleMetadata['attributes'][1]['value'] = nfTitle['propertyAddress']['words'][0]

        filename = 'metadata/' + nfTitleMetadata['name'].toLowerCase().replace(/\s/g, '-')
        let data = JSON.stringify(nfTitleMetadata)
        fs.writeFileSync(filename + '.json', data)
    }
    callback(nfTitle)
}