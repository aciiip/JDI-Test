<template>
  <div>
    <v-row justify="center" align="center" style="margin: 20px 10px 0;">
      <v-col cols="12" style="display: flex; gap: 10px;">
        <v-text-field
          v-model="query"
          height="35"
          rounded
          background-color="grey lighten-3"
          placeholder="Find Movie"
          style="margin: 0; padding: 0;"
        />
        <v-btn icon height="35" width="35" style="margin: 0; padding: 0;" @click="search">
          <v-icon>
            mdi-magnify
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row style="margin-top: -30px;">
      <v-col cols="12">
        <v-tabs v-if="!inSearch" v-model="tab" grow @change="onTabChange">
          <v-tab>In Theatres</v-tab>
          <v-tab>Popular</v-tab>
          <v-tab>Tv Show</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row style="margin-top: 20px;">
      <v-col cols="12" style="overflow-y: auto; white-space: nowrap;">
        <div v-if="loading" align="center">
          <v-skeleton-loader
            v-for="i in 10"
            :key="i"
            type="card"
            width="200"
            height="300"
            elevation="10"
            style="margin: 20px; display: inline-table; border-radius: 25px;"
          />
        </div>
        <div v-else>
          <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as api from '~/services/api'
import MovieCard from '~/components/MovieCard'

export default {
  components: { MovieCard },
  data: () => ({
    movies: [],
    query: '',
    url: null,
    tab: 0,
    loading: true,
    inSearch: false
  }),
  created () {
    this.reset()
    this.refresh()
  },
  methods: {
    reset () {
      this.url = process.env.API_URL + '/movie/now_playing'
    },
    refresh () {
      this.loading = true
      api.get(this.url, (response) => {
        this.movies = response.data.results
        this.loading = false
      }, () => {
        this.loading = false
      })
    },
    search () {
      if (this.query.length > 0) {
        this.url = process.env.API_URL + '/search/movie?query=' + this.query
        this.inSearch = true
      } else {
        this.inSearch = false
        this.reset()
      }
      this.tab = 0
      this.refresh()
    },
    onTabChange (currentTab) {
      switch (currentTab) {
        case 1:
          this.url = process.env.API_URL + '/discover/movie?sort_by=popularity.desc'
          break
        case 2:
          this.url = process.env.API_URL + '/discover/tv?sort_by=popularity.desc'
          break
        default:
          this.reset()
          break
      }
      this.refresh()
    }
  }
}
</script>
