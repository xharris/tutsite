import build_ctrl from "../controller";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const express = require("express");
const router = express.Router();

const schema = new Schema({
  type: { type: String, required: true },
  value: { type: String, required: true },

  date_created: { type: Date, required: true },
  date_modified: { type: Date, required: true }
});

const model = mongoose.model("media", schema);

const controller = build_ctrl({
  name: "Media",
  model: model,
  ctrls: ["add", "update", "delete", "get_by_id"],
  ctrl_opt: {
    add: {
      modify: (instance, req, res) => {
        console.log(instance.type);
        if (!["video", "image"].includes(instance.type))
          return res.status(400).json({
            success: false,
            error: "Media.type should be video/image"
          });
      }
    }
  }
});

router.post("/media", controller.add);
router.put("/media/:id", controller.update);
router.delete("/media/:id", controller.delete);
router.get("/media/:id", controller.get_by_id);

module.exports = { model, controller, router };