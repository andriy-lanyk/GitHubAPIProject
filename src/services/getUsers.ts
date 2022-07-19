import { Octokit } from 'octokit';

const octokit = new Octokit( {
  auth: `${process.env.REACT_APP_ACCESS_TOKEN}`
})

async function getUsers () {
    const response = await octokit.request( 'GET /users', {} )
    console.log('response: ', response);
    return response;
}

export default getUsers;
