## 1주차 회의록

### 목표

* CSV -> 분석 -> 웹 그래프 렌더링


### 역할 분담

* 박정진 - MongoDB API 서버 (MongoDB <-> Web)
* 임동현 - CSV 파일 실시간 로드 및 분석 처리
* 한수진 - 웹 디자인 및 그래프 렌더링 방법


### GitHub 관리

* 개인 GitHub 작업
* Release 버전은 통합 GitHub에 업로드


### 1주차 수립 개발 계획

1. 수집
  - Airflow를 활용한 수집 자동화 하였음
  - 2015년 1월 ~ 7월 까지 수집(csv)된 데이터 S3에 저장되어 있음
  - 수집하는 과정에서 발생되는 에러 처리를 위해 스크립트 수정
  - Kafka 통신 개발 (이벤트 처리)

2. 분석
  - S3 CSV 파일을 이용한 분석 코드 개발
  - 분석 데이터 MongoDB에 저장
  - MongoDB <-> Web 통신

3. 웹
  - MongoDB <-> Web 통신
  - Web Design
  - 차트 그래프 렌더링 방식

