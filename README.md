# Bebecare mobile web for Svelte

이 웹 서비스는 front framework Svelte 4.0.0 으로 개발 되었습니다.

이 서비스는 local 과 dev 두가지 환경을 제공합니다.

## Local service up

local 환경에서 해당 서비스를 실행하기 위해 하단의 절차를 따르십시오.

(이 서비스는 node.js 설치가 필수적으로 요구됩니다. 다음의 링크로 이동해 node.js 설치 후 하단의 절차를 따르십시오. https://nodejs.org/ko)


```bash
cd bebecare-mobile-web #project location
npm install
npm run local
```

## Dev server service up

dev server 환경에서 서비스를 실행하기 위해 하단의 절차를 따르십시오.

(해당 서비스는 Ubuntu 18.04 및 20.04 에서 테스트 되었습니다.)

```bash
cd bebecare-mobile-web #project location
npm install
npm run build-dev
```

npm background 실행을 위해 빌드 전 다음을 수행하십시오.

```bash
(nohup npm run build-dev &)
```

## Etc...

* 각 서비스 환경에 따라 .env 파일을 제공합니다. 해당 환경에 대한 설정은 rollup.config.js 파일을 확인하십시오.
* npm 패키지 버전에 대한 상세한 내용은 지원하지 않습니다. 호환성 오류는 npm update 를 참고하십시오.
* nohup 에 의한 process 실행을 중단할 경우 다음을 참고하십시오.
```bash
ps -ef | grep node* #search for node process to this project directory
kill -9 {PID}
```

END