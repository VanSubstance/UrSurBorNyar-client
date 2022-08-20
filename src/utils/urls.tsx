const OuterApiUrl = {
  naver: {
    direction: `/api/naver/map-direction/v1/driving`,
  }
}

const InnerApiBaseUrl = `/innerApi`;

const InnerApiUrl = {
  getPath: `${InnerApiBaseUrl}/basic/twocoors`
}

export { OuterApiUrl, InnerApiUrl };