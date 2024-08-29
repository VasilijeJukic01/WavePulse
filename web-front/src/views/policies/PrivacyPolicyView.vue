<template>
  <div class="privacy-policy-view">
    <div class="container">
      <h1 class="title">Privacy Policy</h1>
      <div class="content">
        <p>Welcome to Wave Pulse!</p>
        <p>This Privacy Policy ("Policy") describes how WavePulse ("we", "us", or "our") collects, uses, and shares information about you when you use our website located at <a href="http://localhost:8083" target="_blank" rel="noopener noreferrer">http://localhost:8083</a> (the "Service"). By accessing or using the Service, you consent to the collection, use, and sharing of your information as described in this Policy.</p>

        <h2>1. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Personal Information:</strong> Information that you provide directly, such as your name, email address, and other contact details.</li>
          <li><strong>Usage Data:</strong> Information about how you use the Service, such as your IP address, browser type, operating system, pages visited, and time spent on the Service.</li>
          <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to enhance your experience on our Service and to collect information about your interactions with our website.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>To provide, operate, and maintain the Service.</li>
          <li>To improve, personalize, and expand the Service.</li>
          <li>To understand and analyze how you use the Service.</li>
          <li>To communicate with you, including for customer support and to send you updates or marketing materials.</li>
          <li>To detect, prevent, and address technical issues and fraud.</li>
        </ul>

        <h2>3. Sharing Your Information</h2>
        <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:</p>
        <ul>
          <li><strong>Service Providers:</strong> We may share your information with third-party service providers who assist us in operating the Service and conducting our business, so long as those parties agree to keep your information confidential.</li>
          <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
          <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or any form of sale of some or all of our assets, your information may be transferred as part of that transaction.</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to safeguard your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.</p>

        <h2>5. Your Choices</h2>
        <p>You have the following rights regarding your information:</p>
        <ul>
          <li><strong>Access and Update:</strong> You can request access to and update your personal information by contacting us.</li>
          <li><strong>Opt-Out:</strong> You can opt-out of receiving marketing communications from us by following the instructions in those communications.</li>
          <li><strong>Cookies:</strong> You can manage your cookie preferences through your browser settings.</li>
        </ul>

        <h2>6. Children's Privacy</h2>
        <p>Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us. If we become aware that we have collected personal information from children without verification of parental consent, we will take steps to remove that information from our servers.</p>

        <h2>7. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Your continued use of the Service after any changes constitutes acceptance of those changes.</p>

        <h2>8. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p>Email: <a href="mailto:wavepulse@gmail.com">wavepulse@gmail.com</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicyView'
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
