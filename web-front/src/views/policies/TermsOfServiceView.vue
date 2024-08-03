<template>
  <div class="terms-of-service-view">
    <div class="container">
      <h1 class="title">Terms of Service</h1>
      <div class="content">
        <p>Welcome to Wave Pulse!</p>
        <p>These Terms of Service ("Terms") govern your use of our website located at <a href="http://localhost:8083" target="_blank" rel="noopener noreferrer">http://localhost:8083</a> (the "Service") operated by WavePulse ("us", "we", or "our"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree with any part of the terms, then you may not access the Service.</p>

        <h2>1. Accounts</h2>
        <p>To use certain features of the Service, you may be required to create an account. You agree to provide accurate, complete, and current information during the registration process and to update such information to keep it accurate, complete, and current. You are responsible for safeguarding the password you use to access the Service and for any activities or actions under your password.</p>

        <h2>2. Intellectual Property</h2>
        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of WavePulse and its licensors. The Service is protected by copyright, trademark, and other laws of both Serbia and foreign countries.</p>

        <h2>3. User Content</h2>
        <p>By submitting content to the Service, you grant WavePulse a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content in connection with operating and improving the Service. You are solely responsible for your content and the consequences of posting or publishing it.</p>

        <h2>4. Prohibited Uses</h2>
        <p>You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:</p>
        <ul>
          <li>In any way that violates any applicable national or international law or regulation.</li>
          <li>To exploit, harm, or attempt to exploit or harm minors in any way.</li>
          <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent.</li>
          <li>To impersonate or attempt to impersonate WavePulse, a WavePulse employee, another user, or any other person or entity.</li>
        </ul>

        <h2>5. Termination</h2>
        <p>We may terminate or suspend your account immediately, without prior notice or liability, if you breach any of the Terms or if we believe that you are using the Service in a manner that is not permitted under these Terms.</p>

        <h2>6. Limitation of Liability</h2>
        <p>In no event shall WavePulse, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
        <ul>
          <li>Your use or inability to use the Service;</li>
          <li>Any unauthorized access to or use of our servers and/or any personal information stored therein;</li>
          <li>Any interruption or cessation of transmission to or from the Service;</li>
          <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through the Service by any third party.</li>
        </ul>

        <h2>7. Changes</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will notify you of any changes by posting the new Terms on this page. You are advised to review these Terms periodically for any changes. Your continued use of the Service after any changes to these Terms constitutes acceptance of those changes.</p>

        <h2>8. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <p>Email: <a href="mailto:wavepulse@gmail.com">wavepulse@gmail.com</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsOfServiceView'
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

a:hover {
  text-decoration: underline;
}
</style>
