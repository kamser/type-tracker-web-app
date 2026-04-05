import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { validateUser, validatePartialUser } from "../validator-schema/user.js";
import { SECRET_PHRASE } from '../config/serverConfig.js';
//import {generateTokens, storeRefreshToken} from '../utils.js';

export class UserController {
    constructor({userModel}){
        this.userModel = userModel;
    }

    getById = async (request, response) => {
        const {id} = request.params;

        const user = await this.userModel.getById({id});

        if(user) return response.json(movie);

        response.status(404).json({message: 'User not found'});
    }

    create = async (request, response) => {
        console.log(request.body);
        const result = validateUser(request.body);

        if(!result.success) {
            console.log('Not valid');
            return response.status(404).json({error: JSON.parse(result.error.message)});
        }

        const existingUser = await this.userModel.findOneByUsername({username: result.username});

        console.log('Exist user:', existingUser);

        if(existingUser) return null;

        const newUser = await this.userModel.create({input: result.data});

        response.status(201).json(newUser);
    }

    update = async (request, response) => {
        const result = validatePartialUser(request.body);

        if(!result.success){
            return response.status(404).json({error: JSON.parse(result.error.message)});
        }

        try {
            const {data} = result;
            const {username, bestScoreAchived} = data;

            const {id} = await this.userModel.findOneByUsername({username});

            const updateUser = await this.userModel.update({id, bestScoreAchived});

            return response.status(201).json(updateUser);
        } catch (error) {
            console.log(error);
            throw new Error('Updated not completed');
        }

        
    }

    login = async (request, response) => {

        try {
            const {username, password} = request.body;

            const valiedatedResult = validatePartialUser({username, password});

            if(!valiedatedResult.success) {

                return response.status(404).json({error: JSON.parse(valiedatedResult.error.message)});
            }
            const user = await this.userModel.findOneByUsername({username});

            if(!user) throw new Error('The user does not exist');

            const isValidPassword = await bcrypt.compare(password, user.user_password);

            if(!isValidPassword) throw new Error('Incorrect Password');

            const {user_password:_, ...publicUserData} = user;

            const token = jwt.sign(
                {
                    id: publicUserData.user_id,
                    username: publicUserData.username
                },
                SECRET_PHRASE,
                {
                    expiresIn: '1h'
                }
            );

            /*const tokens = generateTokens(user);

            console.log(tokens);

            await storeRefreshToken(user.user_id, tokens.refreshTokenId, {
                userAgent: request.get('User-Agent'),
                ip: request.ip,
            });

            console.log('After StoreRefershToken');*/


            return response
                    .status(201)
                    .json(JSON.stringify({auth: true, token, ...publicUserData}));

            /*return response
                    .cookie(
                        'access_token',
                        token,
                        {
                            httpOnly: true,
                            secure: false,
                            //sameSite: 'lax',
                            sameSite: 'None',
                            maxAge: 1000 * 60 * 60
                        }
                    )
                    .status(201)
                    .json(JSON.stringify(publicUserData));*/

            /*response.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/'
            });

            console.log('After first response cookie');

            response.json({
                accessToken: tokens.accessToken,
                user: {
                    id: user.user_id,
                    username: user.username,
                }
            });

            console.log('After second response cookie');*/


        } catch (error) {
            return response.status(401).send(error.message);
        }
    }

    logout = async (request, response) => {
        response.status(200).json({message: 'everythig is okay'});
    }

    protected = async (request, response) => {
        response.status(200).json({message: 'everythig is okay'});
    }
    
}