<template>
  <div class="privacy-policy-view">
    <div class="container">
      <h1 class="title">{{ $t('footer.privacy_policy.title') }}</h1>
      <div class="content">
        <p>{{ $t('footer.privacy_policy.welcome') }}</p>
        <p v-html="$t('footer.privacy_policy.intro', { url: serviceUrl, linkText: 'WavePulse' })"></p>

        <h2>{{ $t('footer.privacy_policy.information_we_collect') }}</h2>
        <p>{{ $t('footer.privacy_policy.personal_information') }}</p>
        <p>{{ $t('footer.privacy_policy.usage_data') }}</p>
        <p>{{ $t('footer.privacy_policy.cookies') }}</p>

        <h2>{{ $t('footer.privacy_policy.how_we_use_information') }}</h2>
        <p>{{ $t('footer.privacy_policy.use_purposes') }}</p>
        <ul>
          <li>{{ $t('footer.privacy_policy.provide_service') }}</li>
          <li>{{ $t('footer.privacy_policy.improve_service') }}</li>
          <li>{{ $t('footer.privacy_policy.analyze_usage') }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicyView',
  data() {
    return {
      serviceUrl: process.env.VUE_APP_URL
    };
  }
};
</script>

<style scoped>
.privacy-policy-view {
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

a:hover {
  text-decoration: underline;
}
</style>
