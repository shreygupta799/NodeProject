import express from "express";
import * as NotesController from "../controller/notes"  //here we are importing the getNotes function from the notes.ts file in the controller folder
    //we can also import getNotes by writing import {getNotes} from "../controller/notes" but we are importing all the functions from the notes.ts file in the controller folder


    const router=express.Router();

router.get('/',NotesController.getNotes );

router.get('/:noteId',NotesController.getNote);  //this noteId is an id of a note which will be read by express

router.post('/',NotesController.createNotes);

export default router; //we are exporting the router object which contains the getNotes function