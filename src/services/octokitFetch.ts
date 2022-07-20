import { Octokit } from "octokit";

type TOption = {
    [key:string]: string
}

const octokit = new Octokit({
  auth: `${process.env.REACT_APP_ACCESS_TOKEN}`
} )

const octokitFetch = async (url:string, options:TOption = {}) => {
    const result = await octokit.request( `GET ${ url }`, options );
    return result;
}

export default octokitFetch;