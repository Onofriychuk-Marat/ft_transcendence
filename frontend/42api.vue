<script>
export default {
  name: "googleAuth",
  created() {
    const requestOptions = {
      method: "POST"
    };
    fetch("https://api.intra.42.fr/oauth/authorize?client_id=74bccccfc5c882fab475da83297ac3e5f3a0634bac58c1a51e1c10244be8ffd4&redirect_uri=https%3A%2F%2Fwww.google.com%2F&response_type=code", requestOptions)
      .then(response => response.json())
      .then(data => (this.postId = data.id));
  }
};
</script>
