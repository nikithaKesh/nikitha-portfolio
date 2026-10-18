"use client";
import {createContext,useContext} from "react";
export const CinemaContext=createContext(false);
export const useQuietMotion=()=>useContext(CinemaContext);
