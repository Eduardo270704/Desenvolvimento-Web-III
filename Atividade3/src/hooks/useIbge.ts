import { useContext } from "react";
import { ContextIBGE } from "../context";

export default function useIbge() {
    return useContext(ContextIBGE);
}