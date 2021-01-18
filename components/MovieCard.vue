<template>
  <div style="display: inline-table; margin: 20px;">
    <v-card
      :to="'/detail/' + movie.id"
      ripple
      width="200"
      height="300"
      style="border-radius: 25px; overflow: hidden"
      elevation="20"
    >
      <v-img :src="getImage(movie.poster_path)" width="100%" height="100%" />
    </v-card>
    <div align="center" style="margin-top: 20px; max-width: 200px;">
      <h3 style="white-space: normal;">
        {{ movie.title }}
      </h3>
      <div>
        <v-icon color="orange" style="margin-bottom: 3px;">
          mdi-star
        </v-icon>
        <span style="">{{ movie.vote_average }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '~/services/api'

export default {
  props: {
    movie: {
      default: null,
      type: Object
    }
  },
  methods: {
    getImage (path) {
      return api.getImage(path)
    }
  }
}
</script>
