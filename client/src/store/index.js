import { createStore } from 'vuex';
import datepicker from "@store/datepicker";
import adminPanel from "./adminPanel";
import gallery from "./gallery";
import admin from "@store/admin";

export const store = createStore({ modules: { datepicker, admin, adminPanel, gallery } });