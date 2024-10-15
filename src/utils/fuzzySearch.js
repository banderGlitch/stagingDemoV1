import Fuse from 'fuse.js';
import actionsData from './actionsData';



const options = {
  keys: ['name', 'description'],
  threshold: 0.3, // Adjust this to control how closely matches need to be
};
const fuse = new Fuse(actionsData, options);

export default function searchActions(query) {
  return fuse.search(query).map(result => result.item);
};

