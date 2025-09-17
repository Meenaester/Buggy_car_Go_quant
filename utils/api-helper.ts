import { APIRequestContext } from '@playwright/test';

export class APIHelper {
    request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getToken(username: string, password: string) {
        const response = await this.request.post('https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/oauth/token', {
            form: {
                grant_type: 'password',
                username,
                password
            }
        });
        const body = await response.json();
        return body.access_token;
    }

    async getCurrentUser(token: string) {
        return await this.request.get('https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/users/current', {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    async getProfile(token: string) {
        return await this.request.get('https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    async updateProfile(token: string, profileData: object) {
        return await this.request.put('https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/users/profile', {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: profileData
        });
    }

    async getDashboard(token: string) {
        return await this.request.get('https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/dashboard', {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    async getModelDetails(token: string, modelId: string) {
        return await this.request.get(`https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/models/${modelId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    async voteModel(token: string, modelId: string, comment: string) {
        return await this.request.post(`https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/models/${modelId}/vote`, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { comment }
        });
    }

    async getMakeDetails(token: string, makeId: string, page: number, orderBy?: string) {
        const query = orderBy ? `?modelsPage=${page}&modelsOrderBy=${orderBy}` : `?modelsPage=${page}`;
        return await this.request.get(`https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/makes/${makeId}${query}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    async createUser(userData: object) {
        return await this.request.post('https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/users', {
            headers: { 'Content-Type': 'application/json' },
            data: userData
        });
    }
}
