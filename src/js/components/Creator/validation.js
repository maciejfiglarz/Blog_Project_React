import React, { useState, useEffect } from "react";

export const validation = (imageData,content) => {
    let errors = [];

    if(content.length < 8){
        errors.push('Komentarz musi zawierać conajmniej 8 znaków!');
    }
    if(!imageData.id){
        errors.push('Musisz wybrać zdjęcie!');
    }
    return errors;
}

