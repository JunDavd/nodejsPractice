import Agent from "../../models/Agent.js";
import { unlink } from "node:fs/promises";
import path from "node:path";
import createError from "http-errors";

/**
 *
 * /api/agentes
 * get:
 *  description:
 *      Return list of agents
 *    parameters:
 *      -in: body
 */

export async function list(req, rest, next) {
  try {
    const userId = req.apiUserId;
    console.log(userId);
    //filters
    //http://localhost:3000/api/agents?name=Smith
    const filterName = req.query.name;
    //http://localhost:3000/api/agents?age=33
    const filterAge = req.query.age;
    //paginations
    //http://localhost:3000/api/agents?limit=2&skip=2
    const limit = req.query.limit;
    const skip = req.query.skip;

    //sorting
    //http://localhost:3000/api/agents?sort=name
    //http://localhost:3000/api/agents?sort=age%20name

    const sort = req.query.sort;

    const fields = req.query.fields;

    const widthCount = req.query.count === "true";

    const filter = {
      owner: userId,
    };

    if (filterName) {
      filter.name = filterName;
    }

    if (filterAge) {
      filter.age = filterAge;
    }

    const agents = await Agent.list(filter, limit, skip, sort, fields);
    const result = { results: agents };

    if (widthCount) {
      const count = await Agent.countDocuments(filter);
      result.count = count;
    }
    rest.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getOne(req, res, next) {
  try {
    const agentId = req.params.agentId;
    const userId = req.apiUserId;

    const agent = await Agent.findOne({ _id: agentId, owner: userId });

    res.json({ result: agent });
  } catch (error) {
    next(error);
  }
}

export async function newAgent(req, res, next) {
  try {
    const agentData = req.body;
    const userId = req.apiUserId;
    //create agent in memory
    const agent = new Agent(agentData);
    agent.avatar = req.file?.filename;
    agent.owner = userId;
    //save agent
    const savedAgent = await agent.save();

    res.status(201).json({ result: savedAgent });
  } catch (error) {
    next(error);
  }
}

export async function upDate(req, res, next) {
  try {
    const agentId = req.params.agentId;
    const userId = req.apiUserId;
    const agentData = req.body;
    agentData.avatar = req.file?.filename;

    const updatedAgent = await Agent.findOneAndUpdate(
      {
        _id: agentId,
        owner: userId,
      },
      agentData,
      {
        new: true,
      }
    );
    res.json({ result: updatedAgent });
  } catch (error) {
    next(error);
  }
}

export async function deleteAgent(req, res, next) {
  try {
    const agentId = req.params.agentId;
    const userId = req.apiUserId;
    //Comprobar si el agente es propiedad del usuario
    //validar
    //remove avatar file if exists
    const agent = await Agent.findById(agentId);
    //comprobar que existe
    if (!agent) {
      console.log(
        `WARNING! USER ${userId} is trying to delete no existing agent`
      );
      return next(createError(404));
    }

    //comprobar la propiedad

    if (agent.owner.toString() !== userId) {
      console.log(
        `WARNING! USER ${userId} is trying to delete agents of other users`
      );
      return next(createError(401));
    }

    if (agent.avatar) {
      await unlink(
        path.join(
          import.meta.dirname,
          "..",
          "..",
          "public",
          "avatars",
          agent.avatar
        )
      );
    }

    await Agent.deleteOne({ _id: agentId });
    res.json();
  } catch (error) {
    next(error);
  }
}
