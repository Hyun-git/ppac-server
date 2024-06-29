import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import { CustomRequest } from 'src/middleware/requestedInfo';

import CustomError from '../errors/CustomError';
import { HttpCode } from '../errors/HttpCode';
import * as UserService from '../service/user.service';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!_.has(req.body, 'deviceId')) {
    return next(new CustomError(`'deviceId' field should be provided`, HttpCode.BAD_REQUEST));
  }

  try {
    const user = await UserService.createUser(req.body);
    return res.json({ ...user });
  } catch (err) {
    return next(new CustomError(err.message, err.status));
  }
};

const createMemeReaction = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const user = req.requestedUser;
  const meme = req.requestedMeme;

  try {
    const updatedMeme = await UserService.createMemeReaction(user, meme);
    return res.json({ ...updatedMeme });
  } catch (err) {
    return next(new CustomError(err.message, err.status));
  }
};

const createMemeSave = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const user = req.requestedUser;
  const meme = req.requestedMeme;

  try {
    const ret = await UserService.createMemeSave(user, meme);
    return res.json({ ret });
  } catch (err) {
    return next(new CustomError(err.message, err.status));
  }
};

const createMemeShare = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const user = req.requestedUser;
  const meme = req.requestedMeme;

  try {
    const ret = await UserService.createMemeShare(user, meme);
    return res.json({ ret });
  } catch (err) {
    return next(new CustomError(err.message, err.status));
  }
};

const createMemeWatch = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const user = req.requestedUser;
  const meme = req.requestedMeme;

  try {
    const ret = await UserService.createMemeWatch(user, meme);
    await UserService.updateLastSeenMeme(user, meme);
    return res.json({ ret });
  } catch (err) {
    return next(new CustomError(err.message, err.status));
  }
};

const deleteMemeSave = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const user = req.requestedUser;
  const meme = req.requestedMeme;

  try {
    const result = await UserService.deleteMemeSave(user, meme);
    return res.json({ result });
  } catch (err) {
    return next(new CustomError(err.message, err.status));
  }
};

const getLastSeenMeme = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const user = req.requestedUser;

  try {
    const memeList = await UserService.getLastSeenMeme(user);
    return res.json({ memeList });
  } catch (err) {
    return next(new CustomError(err.message, err.status));
  }
};

const getSavedMeme = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const user = req.requestedUser;

  try {
    const memeList = await UserService.getSavedMeme(user);
    return res.json({ memeList });
  } catch (err) {
    return next(new CustomError(err.message, err.status));
  }
};

export {
  createUser,
  createMemeReaction,
  createMemeSave,
  createMemeShare,
  createMemeWatch,
  deleteMemeSave,
  getLastSeenMeme,
  getSavedMeme,
};
