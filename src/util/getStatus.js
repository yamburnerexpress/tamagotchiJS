import statuses from '../data/statuses.json';

const getStatusById = (id) => {
    for (var i = 0; i < statuses.statuses.length; i++) {
      if (statuses.statuses[i].id === id) {
          return statuses.statuses[i]
      }
    }
}

export default getStatusById