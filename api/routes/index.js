module.exports = [
    {name: 'create-project', func: require('./create-project')},
    {name: 'get-projects', func: require('./get-projects')},
    {name: 'delete-project', func: require('./delete-project')},
    {name: 'create-collection', func: require('./create-collection')},
    {name: 'get-collection', func: require('./get-collection')},
    {name: 'get-collection-bulk', func: require('./get-collection-bulk')},
    {name: 'delete-collection', func: require('./delete-collection')},
    {name: 'discord:connect-to-bot'},
    {name: 'discord:start-experiment', func: require('./start-experiment')},
    {name: 'discord:stop-experiment', func: require('./stop-experiment')},
];