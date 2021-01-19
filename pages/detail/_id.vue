<template>
  <div>
    <div v-if="loading">
      <div style="display: flex; justify-content: center; align-items: center; width: 100vw; height: 100vh;">
        loading...
      </div>
    </div>
    <div v-else>
      <div v-if="video">
        <div style="height: 300px; overflow: hidden; border-bottom-left-radius: 50px;">
          <v-img :src="getImage(video.poster_path)" />
        </div>
        <v-card elevation="10" style="left: 20px; top: -50px; border-radius: 50px 0 0 50px; padding: 20px 50px; display: flex; justify-content: space-between;">
          <div align="center">
            <div>
              <v-icon color="orange">
                mdi-star
              </v-icon>
            </div>
            <div>
              {{ video.vote_average }}/<span style="font-size: 12px;">10</span>
            </div>
            <div style="font-size: 12px; color: gray;">
              {{ video.vote_count }}
            </div>
          </div>
          <div align="center">
            <div>
              <v-icon color="dark">
                mdi-star-outline
              </v-icon>
            </div>
            <div>
              Rate This
            </div>
          </div>
          <div align="center">
            <div>
              <span style="background-color: limegreen; font-size: 13px; padding: 2px 5px; color: white;">87</span>
            </div>
            <div>
              Metascore
            </div>
            <div style="font-size: 12px; color: gray;">
              {{ video.popularity }}
            </div>
          </div>
        </v-card>
        <div style="padding: 0 20px;">
          <div>
            <h2>
              {{ video.title }}
            </h2>
          </div>
          <div style="margin-top: 10px; font-size: 14px; color: gray;">
            {{ video.release_date.split('-')[0] }}
          </div>
          <div style="margin-top: 10px;">
            <v-btn
              v-for="genre in video.genres"
              :key="genre.id"
              small
              rounded
              outlined
              style="border: 1px solid lightgray; color: gray; margin: 5px;"
            >
              {{ genre.name }}
            </v-btn>
          </div>
        </div>
        <div style="padding: 0 20px; margin-top: 40px;">
          <div>
            <h3 style="color: dimgray;">
              Plot Summary
            </h3>
          </div>
          <div style="margin-top: 10px;">
            <p style="color: gray;">
              {{ video.overview }}
            </p>
          </div>
        </div>
        <div v-if="credits" style="padding: 0 20px; margin-top: 40px;">
          <div>
            <h3 style="color: dimgray;">
              Cast & Crew
            </h3>
          </div>
          <div style="margin-top: 10px; white-space: nowrap; overflow-y: auto;">
            <div
              v-for="(credit, index) in credits"
              :key="index"
              align="center"
              style="display: inline-block; white-space: normal; vertical-align: top; margin: 10px;"
            >
              <v-img width="80" height="80" :src="getImage(credit.profile_path)" style="border-radius: 50%; border: 1px solid lightgray;" />
              <div style="margin: 10px 0; max-width: 80px;">
                {{ credit.name }}
              </div>
              <div style="color: gray; max-width: 80px;">
                {{ (credit.character !== undefined) ? credit.character : credit.known_for_department }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch () {
    this.video = await fetch(process.env.BASE_URL + '/api/detail/' + this.id).then(res => res.json())
    this.loading = false
  },
  data: () => ({
    id: null,
    video: null,
    credits: [],
    loading: true
  }),
  created () {
    this.id = this.$route.params.id
    this.getCredit()
  },
  methods: {
    getImage (path) {
      let result = null
      if (path) {
        result = 'https://image.tmdb.org/t/p/w200' + path
      }
      return result
    },
    async getCredit () {
      const data = await fetch(process.env.BASE_URL + '/api/credit/' + this.id).then(res => res.json())
      const credits = data.crew.concat(data.cast)
      // remove duplicate user
      const index = []
      for (let i = 0; i < credits.length; i++) {
        const current = credits[i]
        if (!index.includes(current.id)) {
          index.push(current.id)
          this.credits.push(current)
        }
      }
    }
  },
  head () {
    return {
      title: (this.video) ? this.video.title : 'Detail'
    }
  }
}
</script>
