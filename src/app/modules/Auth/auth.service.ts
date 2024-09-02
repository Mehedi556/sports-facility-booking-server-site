import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLogin, TSignup } from "./auth.interface";
import { User } from "./auth.model";
import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken'
import config from "../../config";
import { createToken, verifyToken } from "./auth.utils";


// this service is created for create new user
const createUserIntoDB = async (payload:TSignup) => {
    const newUser = await User.create(payload);
    return newUser;
}

const getUserFromDB = async (_id:string) => {
    const result = await User.findById(_id);
    return result;
}

// this service is created for login user
const loginUser = async (payload:TLogin) => {
    const { email, password } = payload;

    const userExists = await User.findOne({ email }).select('+password');
    // finding user. If user is not found then throw error

    if (!userExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    const passwordMatched = await bcrypt.compare(password, userExists?.password)
    // matching password. if not matched then throw error.

    if (!passwordMatched) {
        throw new AppError(httpStatus.NOT_FOUND, 'Invalid Password');
    }

    const jwtPayload = {
        _id: userExists?._id,
        email: userExists?.email,
        role: userExists?.role
    }


    // const accessToken = jwt.sign( jwtPayload, config.jwt_access_secret as string, { expiresIn: '10d' });
    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
      );
    
      const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string,
      );

    return {
        token: accessToken,
        refreshToken,
        data: {
            _id: userExists?._id,
            name: userExists?.name,
            email: userExists?.email,
            phone: userExists?.phone,
            role: userExists?.role,
            address: userExists?.address,
        }
        
    };
}

const refreshToken = async (token: string) => {
    // checking if the given token is valid
    const decoded = verifyToken(
      token,
      config.jwt_refresh_secret as string,
    ) as JwtPayload;
  
    const { _id } = decoded;
  
    // checking if the user is exist
    const user = await User.findById(_id);
  
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const jwtPayload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    return {
        accessToken,
    };
};



export const AuthServices = {
    createUserIntoDB,
    getUserFromDB,
    loginUser,
    refreshToken
}