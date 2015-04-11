import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    polylines: {embedded: 'always'},
    markers: {embedded: 'always'},
    points: {embedded: 'always'}
  }
});
