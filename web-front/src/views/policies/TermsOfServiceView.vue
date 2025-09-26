<template>
  <div class="terms-of-service-view">
    <div class="container">
      <h1 class="title">{{ $t('footer.terms_of_service.title') }}</h1>
      <div class="content">
        <p>{{ $t('footer.terms_of_service.welcome') }}</p>
        <p v-html="$t('footer.terms_of_service.intro', { url: serviceUrl, linkText: 'WavePulse'})"></p>

        <h2>{{ $t('footer.terms_of_service.accounts') }}</h2>
        <p>{{ $t('footer.terms_of_service.accounts_text') }}</p>

        <h2>{{ $t('footer.terms_of_service.intellectual_property') }}</h2>
        <p>{{ $t('footer.terms_of_service.intellectual_property_text') }}</p>

        <h2>{{ $t('footer.terms_of_service.user_content') }}</h2>
        <p>{{ $t('footer.terms_of_service.user_content_text') }}</p>

        <h2>{{ $t('footer.terms_of_service.prohibited_uses') }}</h2>
        <p>{{ $t('footer.terms_of_service.prohibited_uses_text') }}</p>
        <ul>
          <li v-for="(item, index) in $t('footer.terms_of_service.prohibited_uses_list')" :key="index">
            {{ item }}
          </li>
        </ul>

        <h2>{{ $t('footer.terms_of_service.termination') }}</h2>
        <p>{{ $t('footer.terms_of_service.termination_text') }}</p>

        <h2>{{ $t('footer.terms_of_service.limitation_of_liability') }}</h2>
        <p>{{ $t('footer.terms_of_service.limitation_of_liability_text') }}</p>
        <ul>
          <li v-for="(item, index) in $t('footer.terms_of_service.limitation_of_liability_list')" :key="index">
            {{ item }}
          </li>
        </ul>

        <h2>{{ $t('footer.terms_of_service.changes') }}</h2>
        <p>{{ $t('footer.terms_of_service.changes_text') }}</p>

        <h2>{{ $t('footer.terms_of_service.contact_us') }}</h2>
        <p>{{ $t('footer.terms_of_service.contact_us_text') }}</p>
        <p>{{ $t('footer.terms_of_service.contact_email') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsOfServiceView',
  data() {
    return {
      serviceUrl: process.env.VUE_APP_URL
    };
  }
};
</script>


<style scoped>
.terms-of-service-view {
  background-color: #181818;
  min-height: 100vh;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  background-color: #282828;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 2.2rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
}

.content {
  font-size: 1rem;
  color: #cccccc;
  line-height: 1.8;
}

h2 {
  font-size: 1.6rem;
  margin-top: 20px;
  border-bottom: 2px solid #444444;
  padding-bottom: 8px;
}

ul {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 20px;
}

a {
  color: #1e90ff;
  text-decoration: none;
}

.terms-of-service-view  {
  color: #4040ff !important;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
</style>
