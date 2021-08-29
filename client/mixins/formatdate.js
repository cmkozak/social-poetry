import moment from 'moment';

const mixin = {
  methods: {
    formatDate(date) {
      return moment.utc(date).local().format('dddd, MMM Do YYYY');
    },
  },
};

export default mixin;