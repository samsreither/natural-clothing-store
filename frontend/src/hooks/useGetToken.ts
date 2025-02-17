import { useCookies } from 'react-cookie';

// retrieves access token from the cookies
// formats for use in requests

export const useGetToken = () => {
    const [cookies, _] = useCookies(["access_token"])

    return {headers: {authorization: cookies.access_token}}
}