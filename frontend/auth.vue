<script>
export default {
  name: "googleAuth",
  created() {
    const requestOptions = {
      method: "POST"
    };
    fetch("https://www.authenticatorApi.com/pair.aspx?AppName=ft_transcendence&SecretCode=1234567890", requestOptions)
      .then(response => response.json())
      .then(data => (this.postId = data.id));
  }
  connected() {
	const requestOptions = {
      method: "POST"
    };
	fetch("https://www.authenticatorApi.com/Validate.aspx?Pin=" + userPin + "&SecretCode=1234567890", requestOptions)
      .then(response => response.json())
      .then(data => (this.postId = data.id));
  }
};
</script>
