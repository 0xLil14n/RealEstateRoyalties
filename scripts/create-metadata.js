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
        },
        {
            "trait_type": "boundariesURI",
            "value": ""
        },
        {
            "trait_type": "floorplansURI",
            "value": ""
        },
        {
            "trait_type": "easements",
            "value": ""
        },
        {
            "trait_type": "schoolZoning",
            "value": ""
        },
        {
            "trait_type": "buildingPermits",
            "value": ""
        },
        {
            "trait_type": "caveats",
            "value": ""
        },
        {
            "trait_type": "municipality",
            "value": ""
        },
        {
            "trait_type": "environmentTitle",
            "value": ""
        },
        {
            "trait_type": "leasingAndMiningRights",
            "value": ""
        },
        {
            "trait_type": "geographyAndTopology",
            "value": ""
        },
    ]
}
module.exports = async callback => {
    const deployedNFTitle = await NFTitle.deployed()
    length = await deployedNFTitle.getNumberOfProperties()
    index = 0
    while (index < length) {
        console.log('Let\'s get the overview of your property ' + index + ' of ' + length)
        let nfTitleMetadata = metadataTemple

//        let property = await deployedNFTitle.properties(index);

        let property = await deployedNFTitle.getPropertyMetadata(0);
        console.log('propertytyyt', property);
        // get ownerOf
        let owner = await deployedNFTitle.ownerOf(index);
        console.log('owner:', owner);
        index++
        nfTitleMetadata['name'] = property[0];
        nfTitleMetadata['description']= property[1];
        if (fs.existsSync('metadata/' + nfTitleMetadata['name'].toLowerCase().replace(/\s/g, '-') + '.json')) {
            console.log('test')
            continue
        }
        console.log(nfTitleMetadata['name'])
        nfTitleMetadata['attributes'][0]['value'] = property[1]
        nfTitleMetadata['attributes'][1]['value'] = property[2]
        nfTitleMetadata['attributes'][2]['value'] = property[3]

        filename = 'src/metadata/' + nfTitleMetadata['name'].toLowerCase().replace(/\s/g, '-')
        let data = JSON.stringify(nfTitleMetadata)
        fs.writeFileSync(filename + '.json', data)
    }
    callback(deployedNFTitle)
}