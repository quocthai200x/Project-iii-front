export default {
    rootPath: process.env.NODE_ENV === 'development'
    ?'http://localhost:5555':'https://project-iii-back.herokuapp.com/'
    // rootPath: 'http://localhost:6969'
};