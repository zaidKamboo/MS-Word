const express = require("express");
const router = express.Router();
const Document = require("../Models/Document");

router.post("/createDocument", async (req, res) => {
  let success = false;
  try {
    const { title } = req.body;
    const ownerId = req.body.id;

    // Create a new document
    const document = new Document({
      title,
      content: "",
      owner: ownerId,
    });

    // Save the document to the database
    await document.save();
    success = true;
    // Return the newly created document details
    return res.status(201).json({
      success: true,
      message: "Document created successfully.",
      document,
    });
  } catch (error) {
    console.error("Error creating document:", error.message);
    return res.status(500).json({
      success,
      message: error.message,
      error: "Internal Server Error",
    });
  }
});

router.get("/getDocuments/:id", async (req, res) => {
  let success = false;
  try {
    const userId = req?.params.id;

    // Check if the user has access to view documents
    const documents = await Document.find({ owner: userId });

    if (!documents || documents.length === 0) {
      return res
        .status(404)
        .json({ success, message: "No documents found for this user." });
    }

    success = true;
    return res
      .status(200)
      .json({ documents, success, message: "Docs fetched successfully." });
  } catch (error) {
    console.error("Error fetching documents:", error.message);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
      success,
    });
  }
});
router.put("/edit/:id", async (req, res) => {
  let success = false;
  try {
    const documentId = req?.params.id;

    const { content } = req?.body;
    const userId = req?.body?.id;
    const title = req?.body?.title;

    // Check if the user has access to edit the document
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ success, message: "Document not found." });
    }
    if (document.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        success,
        message: "Permission denied - You are not the owner of this document",
      });
    }

    // Update the content and timestamp of the document
    document.content = content;
    document.title = title;
    document.updatedAt = new Date();
    await document.save();
    success = true;
    return res
      .status(200)
      .json({ document, success, message: "Document edited successfully." });
  } catch (error) {
    console.error("Error updating document:", error.message);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
      success,
    });
  }
});
router.delete("/deleteDocument/:id", async (req, res) => {
  let success = false;
  try {
    const documentId = req?.params?.id;
    const userId = req?.body?.id;
    // Check if the user has access to delete the document
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ success, message: "Document not found." });
    }
    if (document.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        success,
        message: "Permission denied - You are not the owner of this document",
      });
    }

    // Delete the document
    let deletedDoc = await Document.findByIdAndDelete(documentId);

    let documents = await Document.find();
    success = true;
    return res
      .status(200)
      .json({ success, message: "Document deleted successfully.", documents });
  } catch (error) {
    console.error("Error deleting document:", error.message);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
      success,
    });
  }
});

module.exports = router;
