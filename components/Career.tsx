'use client'
import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'

const skills = [
  { name: 'Service Planning', level: 95 },
  { name: 'System Design', level: 90 },
  { name: 'Ecommerce (cafe24/woo-commerce/odoo/Shopify)', level: 90 },
  { name: 'Project Management', level: 95 },
  { name: 'QA & Testing', level: 95 },
  { name: 'Data Analysis (GA)', level: 80 },
]

const devTools = [
  { name: 'Inspo', desc_en: 'Screenshot & collaboration tool', desc_kr: '스크린샷 기록 협업 툴', status: 'done' },
  { name: 'TalkTalk', desc_en: 'Ecommerce messenger UI/UX', desc_kr: '이커머스 메신저 기능 UI/UX', status: 'done' },
  { name: 'A/B Test Tool', desc_en: 'A/B testing platform', desc_kr: 'A/B 테스트 플랫폼', status: 'pending' },
  { name: 'Survey Tool', desc_en: 'Survey management platform', desc_kr: '설문 관리 플랫폼', status: 'pending' },
  { name: 'Seller Center', desc_en: 'Seller/settlement management', desc_kr: '셀러 / 입점 / 정산 관리 툴', status: 'pending' },
  { name: 'Segment Lab', desc_en: 'User segment & targeting', desc_kr: '유저 세그먼트 / 타겟팅 관리 툴', status: 'pending' },
]

const studyItems = [
  {
    category_en: 'Computer Science',
    category_kr: '컴퓨터공학',
    items: [
      { en: 'C Programming', kr: 'C언어' },
      { en: 'Database', kr: '데이터베이스' },
      { en: 'Algorithms', kr: '알고리즘' },
      { en: 'Operating Systems', kr: '운영체제' },
      { en: 'Data Structures', kr: '자료구조' },
      { en: 'Computer Architecture', kr: '컴퓨터구조' },
      { en: 'Computer Networks', kr: '컴퓨터네트워크' },
    ],
  },
  {
    category_en: 'Analytics',
    category_kr: '분석',
    items: [
      { en: 'Google Analytics (GA4)', kr: '구글 애널리틱스(GA4)' },
    ],
  },
]

const companies = [
  {
    id: 'kiss',
    name: 'KISS',
    period: '2024~Now',
    color: '#1a4fd8',
    projects: [
      // ─── Development ───────────────────────────────
      {
        id: 'k-ivyusa',
        name: 'IVYUSA',
        period: '2024~Now',
        tag: 'Ecommerce',
        desc_en: 'US flagship Shopify store',
        desc_kr: 'US 자사몰 Shopify 플랫폼 운영',
        detail_en: 'Managed and operated the IVYUSA main Shopify storefront. Handled feature development, data management, issue response, and operational support across all functions.',
        detail_kr: 'IVYUSA 메인 Shopify 자사몰 운영 및 기능 개발. 데이터 관리, 이슈 대응, 전반적인 운영 지원을 담당했습니다.',
      },
      {
        id: 'k-etlee',
        name: 'Etlee',
        period: '2024~Now',
        tag: 'Ecommerce',
        desc_en: 'Etlee brand site development',
        desc_kr: 'Etlee 브랜드 사이트 개발',
        detail_en: 'Led development of the Etlee brand site. Defined requirements, coordinated development, and managed QA and launch.',
        detail_kr: 'Etlee 브랜드 사이트 개발 총괄. 요구사항 정의, 개발 조율, QA 및 런칭을 담당했습니다.',
      },
      {
        id: 'k-arria',
        name: 'Arria',
        period: '2024~Now',
        tag: 'Ecommerce',
        desc_en: 'Arria brand site development',
        desc_kr: 'Arria 브랜드 사이트 개발',
        detail_en: 'Led development of the Arria brand site. Managed requirements, vendor coordination, QA, and deployment.',
        detail_kr: 'Arria 브랜드 사이트 개발 총괄. 요구사항 정의, 개발사 조율, QA 및 배포를 담당했습니다.',
      },
      {
        id: 'k-b2b',
        name: 'IVYUSA B2B Pro',
        period: '2026.01~03',
        tag: 'B2B',
        desc_en: 'Wholesale order structure & B2B platform',
        desc_kr: 'Wholesale 주문 구조 설계 및 B2B 플랫폼',
        detail_en: 'Designed the entire B2B wholesale ordering system from scratch. Defined order flow, approval process, pricing tiers, and operational policies for US market B2B clients.',
        detail_kr: '미국 시장 B2B 클라이언트를 위한 Wholesale 주문 시스템 전체 설계. 주문 흐름, 승인 프로세스, 가격 티어, 운영 정책을 정의했습니다.',
      },
      {
        id: 'k-talktalk',
        name: 'TalkTalk Messenger',
        period: '2026.03',
        tag: 'Feature',
        desc_en: 'Real-time messaging feature architecture',
        desc_kr: '실시간 메시징 기능 아키텍처 설계',
        detail_en: 'Designed the architecture and service flow for TalkTalk, an in-store messenger feature. Defined real-time messaging, notification, and status management with backend integration structure.',
        detail_kr: '자사몰 내 TalkTalk 메신저 기능의 아키텍처 및 서비스 플로우 설계. 실시간 메시징, 알림, 상태 관리 기능과 백엔드 연동 구조를 정의했습니다.',
      },
      // ─── Migration ─────────────────────────────────
      {
        id: 'k-migration',
        name: 'Odoo → Shopify Full Migration',
        period: '2024~Now',
        tag: 'Migration',
        desc_en: 'Odoo → Shopify full data migration',
        desc_kr: 'Odoo → Shopify 전체 데이터 마이그레이션',
        detail_en: 'Led full platform migration from Odoo to Shopify for IVYUSA. Migrated all products, customers, orders, and media. Reconfigured PG, inventory, membership, GA4/GTM, and ERP integrations.',
        detail_kr: 'IVYUSA Odoo → Shopify 전체 플랫폼 마이그레이션 진행. 상품·고객·주문·미디어 전량 이전. PG, 재고, 멤버십, GA4/GTM, ERP 연동 재정비.',
      },
      // ─── Platform ──────────────────────────────────
      {
        id: 'k-beautizen',
        name: 'Beautizen 2.0',
        period: '2025.08~2026.03',
        tag: 'Marketing',
        desc_en: 'Gamification & participation automation platform',
        desc_kr: '게이미피케이션 & 참여 자동화 플랫폼',
        detail_en: 'Built XP/Level gamification structure and participation automation for the Beautizen marketing platform. Designed Creator, Affiliate, Survey features and reward workflow from content to monetization.',
        detail_kr: 'XP/Level 게이미피케이션 구조와 참여 자동화 체계를 신규 설계. Creator, Affiliate, Survey 기능과 콘텐츠에서 수익화로 이어지는 워크플로를 구축했습니다.',
      },
      {
        id: 'k-rt2',
        name: 'Round Table 2.0',
        period: '2025.06~08',
        tag: 'Platform',
        desc_en: 'Platform architecture redesign',
        desc_kr: '플랫폼 아키텍처 재설계',
        detail_en: 'Redesigned the product test survey platform architecture with automation focus. Implemented panel targeting, eligibility verification, duplicate prevention, auto-reminders, and 3rd party reward processing.',
        detail_kr: '자동화 중심으로 플랫폼 아키텍처를 재설계. 패널 타깃팅, 자격 검증, 중복 방지, 자동 리마인더, 3rd Party 보상 처리 기능을 설계했습니다.',
      },
      {
        id: 'k-rt3',
        name: 'Round Table 3.0',
        period: '2026.03',
        tag: 'Platform',
        desc_en: 'Product test platform enhancement & automation',
        desc_kr: '제품 테스트 플랫폼 고도화 & 자동화',
        detail_en: 'Enhanced Round Table 3.0 with automation system focus. Improved panel management, participation history, reward processing, and admin operational logic.',
        detail_kr: 'Round Table 3.0 자동화 시스템 중심 고도화. 패널 관리, 참여 이력, 보상 처리, 관리자 운영 로직을 개선했습니다.',
      },
      {
        id: 'k-marketplace',
        name: 'Marketplace Platform',
        period: '2024.10~2025.09',
        tag: 'Ecommerce',
        desc_en: 'Brand/seller onboarding & marketplace design',
        desc_kr: '브랜드/셀러 입점 & 마켓플레이스 설계',
        detail_en: 'Designed the marketplace commerce platform supporting both B2C and B2B models. Built seller onboarding system, order/settlement/review processes, seller dashboard, commission model, and defined ecommerce service policy documentation.',
        detail_kr: 'B2C와 B2B를 지원하는 마켓플레이스형 커머스 플랫폼 설계. 셀러 입점 시스템, 주문/정산/리뷰 프로세스, 판매자 대시보드, 커미션 모델 구축 및 전자상거래 서비스 정책 정의서 작성.',
      },
      // ─── Feature ───────────────────────────────────
      {
        id: 'k-aiseo',
        name: 'Shopify Product AI SEO',
        period: '2024~Now',
        tag: 'Feature',
        desc_en: 'AI-powered product SEO data management',
        desc_kr: 'AI 기반 상품 SEO 데이터 관리',
        detail_en: 'Managed AI-powered SEO data generation and optimization for Shopify product listings. Coordinated bulk product data updates and quality review.',
        detail_kr: 'Shopify 상품 리스팅의 AI 기반 SEO 데이터 생성 및 최적화 관리. 대량 상품 데이터 업데이트 및 품질 검토를 조율했습니다.',
      },
      {
        id: 'k-segment',
        name: 'User Segment',
        period: '2024~Now',
        tag: 'Feature',
        desc_en: 'Member segmentation & data visualization',
        desc_kr: '자사몰 회원 세그먼트 데이터 페이지 개발',
        detail_en: 'Developed member segmentation data page to analyze and visualize user behavior patterns. Defined segment criteria, data structure, and admin dashboard requirements.',
        detail_kr: '자사몰 회원 세그먼트 데이터 페이지 개발. 세그먼트 기준, 데이터 구조, 관리자 대시보드 요구사항을 정의했습니다.',
      },
      // ─── Operations ────────────────────────────────
      {
        id: 'k-ops',
        name: 'Operations & Issue Management',
        period: '2024~Now',
        tag: 'Operations',
        desc_en: 'Platform ops, data & issue response',
        desc_kr: '플랫폼 운영 데이터 관리 및 이슈 대응',
        detail_en: 'Managed day-to-day platform operations including data column management, feature definition documents, plugin/payment reviews, international shipping configuration, email verification flow, subscription and reward policy management.',
        detail_kr: '일상적인 플랫폼 운영 관리. 데이터 컬럼 관리, 기능 정의서 작성, 플러그인/결제 검토, 국제 배송 설정, 이메일 인증 플로우, 구독 및 리워드 정책 관리를 담당했습니다.',
      },
      {
        id: 'k-tax-ops',
        name: 'Tax · Coupon · Point 운영',
        period: '2024~Now',
        tag: 'Operations',
        desc_en: 'Tax, coupon & point issue response',
        desc_kr: '세금·쿠폰·포인트 이슈 대응 및 운영',
        detail_en: 'Handled tax calculation issues, coupon discount application errors, and point deduction bugs. Investigated root causes, coordinated fixes with development, and documented resolution processes.',
        detail_kr: '세금 계산 이슈, 쿠폰 할인 적용 오류, 포인트 차감 버그 대응. 원인 분석, 개발사 수정 조율, 해결 프로세스 문서화를 담당했습니다.',
      },
    ],
  },
  {
    id: 'amoeba',
    name: 'Amoeba',
    period: '2023~2024',
    color: '#0f8a5a',
    projects: [
      // ─── Development ───────────────────────────────
      { id: 'a-ivyusa', name: 'IVYUSA', period: '2023~2024', tag: 'Ecommerce', desc_en: 'US flagship WooCommerce store', desc_kr: 'US 자사몰 WooCommerce 플랫폼', detail_en: 'Managed and operated the IVYUSA main WooCommerce storefront. Handled plugin management, order flow, PG integration, and operational support.', detail_kr: 'IVYUSA 메인 WooCommerce 자사몰 운영 관리. 플러그인 관리, 주문 흐름, PG 연동, 운영 지원을 담당했습니다.' },
      { id: 'a-vivace', name: 'VIVACE', period: '2023~2024', tag: 'Ecommerce', desc_en: 'Professional hair care brand site', desc_kr: '프로페셔널 헤어케어 브랜드 사이트', detail_en: 'Operated and maintained the VIVACE brand site on WooCommerce. Managed product pages, plugin updates, and QA.', detail_kr: 'VIVACE 브랜드 사이트 WooCommerce 운영 및 유지보수. 상품 페이지, 플러그인 업데이트, QA를 담당했습니다.' },
      { id: 'a-redbykiss', name: 'Red by KISS', period: '2023~2024', tag: 'Ecommerce', desc_en: 'KISS hair tool sub-brand site', desc_kr: 'KISS 헤어툴 서브 브랜드 사이트', detail_en: 'Managed the Red by KISS brand site operations on WooCommerce including product management and QA testing.', detail_kr: 'Red by KISS 브랜드 사이트 WooCommerce 운영. 상품 관리 및 QA 테스트를 담당했습니다.' },
      { id: 'a-ienvy', name: 'iEnvy by KISS', period: '2023~2024', tag: 'Ecommerce', desc_en: 'Lash extension brand site', desc_kr: '인조 속눈썹 전문 브랜드 사이트', detail_en: 'Operated the iEnvy by KISS WooCommerce brand site with product variant management and plugin QA.', detail_kr: 'iEnvy by KISS WooCommerce 브랜드 사이트 운영. 상품 옵션 관리 및 플러그인 QA를 수행했습니다.' },
      { id: 'a-rubykiss', name: 'Ruby Kiss', period: '2023~2024', tag: 'Ecommerce', desc_en: 'Color cosmetics brand site', desc_kr: '뷰티 컬러 코스메틱 브랜드 사이트', detail_en: 'Managed Ruby Kiss WooCommerce brand site operations including promotional campaign setup and QA.', detail_kr: 'Ruby Kiss WooCommerce 브랜드 사이트 운영. 프로모션 캠페인 설정 및 QA를 담당했습니다.' },
      { id: 'a-rubykiss-es', name: 'Ruby Kiss (ES)', period: '2023~2024', tag: 'Ecommerce', desc_en: 'Spanish-language Ruby Kiss store', desc_kr: '스페인어 타겟 Ruby Kiss 별도 스토어', detail_en: 'Managed the Spanish-language Ruby Kiss store operations and localization updates on WooCommerce.', detail_kr: '스페인어 타겟 Ruby Kiss 스토어 운영 및 현지화 업데이트를 담당했습니다.' },
      { id: 'a-vluxe', name: 'VLuxe', period: '2023~2024', tag: 'Ecommerce', desc_en: 'Premium lashes brand site', desc_kr: '프리미엄 래쉬 브랜드 사이트', detail_en: 'Operated the VLuxe premium lashes brand site on WooCommerce with plugin management and QA.', detail_kr: 'VLuxe 프리미엄 래쉬 브랜드 사이트 WooCommerce 운영. 플러그인 관리 및 QA를 수행했습니다.' },
      { id: 'a-madshade', name: 'Mad Shade', period: '2023~2024', tag: 'Ecommerce', desc_en: 'Sunglasses specialist brand site', desc_kr: '선글라스 전문 브랜드 사이트', detail_en: 'Managed Mad Shade WooCommerce brand site operations including product updates and QA testing.', detail_kr: 'Mad Shade WooCommerce 브랜드 사이트 운영. 상품 업데이트 및 QA 테스트를 담당했습니다.' },
      { id: 'a-kissgelpro', name: 'KISS Gel Pro', period: '2023~2024', tag: 'Ecommerce', desc_en: 'Gel nail specialist brand site', desc_kr: '젤 네일 전문 브랜드 사이트', detail_en: 'Operated KISS Gel Pro WooCommerce brand site with kit-based product management and plugin QA.', detail_kr: 'KISS Gel Pro WooCommerce 브랜드 사이트 운영. 키트 기반 상품 관리 및 플러그인 QA를 수행했습니다.' },
      { id: 'a-kissnypro', name: 'KISSNYPro', period: '2023~2024', tag: 'Ecommerce', desc_en: 'Professional nail brand site', desc_kr: '프로페셔널 네일 브랜드 사이트', detail_en: 'Managed KISSNYPro WooCommerce brand site operations with professional product catalog and QA.', detail_kr: 'KISSNYPro WooCommerce 브랜드 사이트 운영. 전문가용 상품 카탈로그 관리 및 QA를 담당했습니다.' },
      { id: 'a-goldfinger', name: 'Gold Finger', period: '2023~2024', tag: 'Ecommerce', desc_en: 'Nail accessories brand site', desc_kr: '네일 액세서리 브랜드 사이트', detail_en: 'Operated Gold Finger WooCommerce brand site with accessory product management and plugin QA.', detail_kr: 'Gold Finger WooCommerce 브랜드 사이트 운영. 액세서리 상품 관리 및 플러그인 QA를 수행했습니다.' },
      // ─── Migration ─────────────────────────────────
      { id: 'a-migration', name: 'IVYUSA WooCommerce Migration', period: '2023~2024', tag: 'Migration', desc_en: 'Cafe24 → WooCommerce full migration', desc_kr: 'Cafe24 → WooCommerce 전환 마이그레이션', detail_en: 'Led full platform migration from Cafe24 to WooCommerce for IVYUSA and sub-brands. Migrated products, orders, customers, and media. Reconfigured PG, 3PL, AvaTax, GA4/GTM, and ERP integrations.', detail_kr: 'IVYUSA 및 서브 브랜드의 Cafe24 → WooCommerce 전체 플랫폼 마이그레이션 진행. 상품·주문·고객·미디어 이전. PG, 3PL, AvaTax, GA4/GTM, ERP 연동 재정비.' },
      // ─── Technical Setup ───────────────────────────
      { id: 'a-powerbi', name: 'Power BI', period: '2023~2024', tag: 'Analytics', desc_en: 'Order & sales data dashboard', desc_kr: '주문·매출 데이터 시각화 대시보드', detail_en: 'Maintained and updated Power BI dashboard connected to WooCommerce order and sales data for real-time reporting.', detail_kr: 'WooCommerce 주문·매출 데이터 연동 Power BI 대시보드 유지 및 업데이트.' },
      { id: 'a-ga', name: 'GA / GTM', period: '2023~2024', tag: 'Analytics', desc_en: 'Ecommerce tracking & conversion setup', desc_kr: '이커머스 이벤트 트래킹 및 전환 분석', detail_en: 'Configured and maintained GA4 and GTM ecommerce event tracking across multiple WooCommerce brand stores.', detail_kr: '다수 WooCommerce 브랜드 스토어 GA4 및 GTM 이커머스 이벤트 트래킹 설정 및 유지 관리.' },
      { id: 'a-tax', name: 'Tax / Authorize', period: '2023~2024', tag: 'Payment', desc_en: 'AvaTax setup & Authorize.net PG', desc_kr: 'AvaTax 세금 계산 및 Authorize.net 연동', detail_en: 'Managed AvaTax tax calculation configuration and Authorize.net PG integration on WooCommerce.', detail_kr: 'WooCommerce AvaTax 세금 계산 설정 및 Authorize.net PG 연동을 관리했습니다.' },
      { id: 'a-shipstation', name: 'ShipStation', period: '2023~2024', tag: 'Logistics', desc_en: '3PL shipping integration & issue handling', desc_kr: '3PL 배송 연동 및 이슈 대응', detail_en: 'Managed ShipStation 3PL logistics integration on WooCommerce. Resolved order sync issues and shipping rule configuration.', detail_kr: 'WooCommerce ShipStation 3PL 물류 연동 관리. 주문 동기화 이슈 및 배송 규칙 설정 문제를 해결했습니다.' },
      // ─── Feature / App ─────────────────────────────
      { id: 'a-beautizen', name: 'Beautizen 1.0', period: '2023~2024', tag: 'Feature', desc_en: 'Beauty community platform PM & dev support', desc_kr: '뷰티 커뮤니티 플랫폼 PM & 개발 지원', detail_en: 'Managed requirements, schedule, and QA for Beautizen 1.0 beauty community platform. Coordinated plugin development and operational feature delivery.', detail_kr: 'Beautizen 1.0 뷰티 커뮤니티 플랫폼 요구사항 정의, 일정 관리, QA 담당. 플러그인 개발 및 운영 기능 납품을 조율했습니다.' },
      { id: 'a-roundtable', name: 'Round Table 1.0', period: '2023~2024', tag: 'Platform', desc_en: 'Product test platform PM & dev support', desc_kr: '제품 테스트 플랫폼 PM & 개발 지원', detail_en: 'Managed Round Table 1.0 product test platform requirements and schedule. Coordinated plugin setup and QA for panel management features.', detail_kr: 'Round Table 1.0 제품 테스트 플랫폼 요구사항 및 일정 관리. 패널 관리 기능 플러그인 설정 및 QA를 조율했습니다.' },
      { id: 'a-bopis', name: 'BOPIS', period: '2023~2024', tag: 'Feature', desc_en: 'Buy Online Pick-up In Store feature PM', desc_kr: 'BOPIS 온라인 구매 매장 픽업 기능 PM', detail_en: 'Managed requirements and development coordination for BOPIS (Buy Online Pick-up In Store) feature. Project was placed on hold after initial planning phase.', detail_kr: 'BOPIS(온라인 구매 매장 픽업) 기능 요구사항 정의 및 개발 조율 담당. 초기 기획 단계 이후 프로젝트 홀드.' },
      // ─── QA & PM ───────────────────────────────────
      { id: 'a-qa', name: 'Plugin QA & Management', period: '2023~2024', tag: 'QA', desc_en: 'WooCommerce plugin QA & management', desc_kr: 'WooCommerce 플러그인 QA 및 관리', detail_en: 'Managed WooCommerce plugin list (Real/Test environments), conducted QA testing for all operational plugins including Smart Coupon, Complianz, Review, Affiliate, and Sheet Editor.', detail_kr: 'WooCommerce 플러그인 목록(Real/Test 환경) 관리 및 운영 플러그인 전체 QA 테스트 수행. Smart Coupon, Complianz, Review, Affiliate, Sheet Editor 등 포함.' },
      { id: 'a-addon', name: 'Add-on App Design', period: '2023~2024', tag: 'Feature', desc_en: 'Add-on application design & dev support', desc_kr: 'Add-on 앱 설계 및 개발 지원', detail_en: 'Designed and supported development of Add-on applications tailored to project requirements. Focused on service scalability and optimization.', detail_kr: '프로젝트 요구사항에 맞춘 Add-on 애플리케이션 설계 및 개발 지원. 서비스 확장성 강화 및 최적화에 집중했습니다.' },
      { id: 'a-doc', name: 'Document Management', period: '2023~2024', tag: 'PM', desc_en: 'Project schedule & document management', desc_kr: '프로젝트 일정 및 문서 관리', detail_en: 'Managed project timelines and key design documents. Coordinated stage-by-stage document submission, review, and guideline documentation.', detail_kr: '프로젝트별 타임라인 조율 및 주요 설계 문서 관리. 단계별 문서 제출, 검토, 가이드라인 문서화를 진행했습니다.' },
    ],
  },
  {
    id: 'cafe24',
    name: 'Cafe24',
    period: '2021~2023',
    color: '#6a4fd8',
    projects: [
      // ─── Development ───────────────────────────────
      {
        id: 'c-ivyusa',
        name: 'IVYUSA',
        period: '2021~2023',
        tag: 'Ecommerce',
        desc_en: 'US flagship ecommerce store',
        desc_kr: 'US 자사몰 플랫폼 구축',
        detail_en: 'Built the main B2B/B2C ecommerce storefront for IVYUSA targeting the US market. Configured product catalog, order flow, membership, and PG integration on Cafe24.',
        detail_kr: '미국 시장을 타겟으로 한 IVYUSA 메인 자사몰 구축. 상품 카탈로그, 주문 흐름, 멤버십, PG 연동을 Cafe24 기반으로 설정했습니다.',
      },
      {
        id: 'c-vivace',
        name: 'VIVACE',
        period: '2021~2023',
        tag: 'Ecommerce',
        desc_en: 'Professional hair care brand site',
        desc_kr: '프로페셔널 헤어케어 브랜드 사이트',
        detail_en: 'Built the brand site for VIVACE, a professional hair care sub-brand of IVYUSA. Configured product pages, brand identity layout, and US market PG.',
        detail_kr: 'IVYUSA 산하 프로페셔널 헤어케어 서브 브랜드 VIVACE의 브랜드 사이트 구축. 상품 페이지, 브랜드 레이아웃, PG 설정을 담당했습니다.',
      },
      {
        id: 'c-redbykiss',
        name: 'Red by KISS',
        period: '2021~2023',
        tag: 'Ecommerce',
        desc_en: 'KISS hair tool sub-brand site',
        desc_kr: 'KISS 헤어툴 서브 브랜드 사이트',
        detail_en: 'Developed the brand site for Red by KISS hair styling tools. Set up product catalog, styling content, and regional shipping configuration.',
        detail_kr: 'Red by KISS 헤어 스타일링 툴 브랜드 사이트 개발. 상품 카탈로그, 스타일링 콘텐츠, 지역별 배송 설정을 진행했습니다.',
      },
      {
        id: 'c-ienvy',
        name: 'iEnvy by KISS',
        period: '2021~2023',
        tag: 'Ecommerce',
        desc_en: 'Lash extension brand site',
        desc_kr: '인조 속눈썹 전문 브랜드 사이트',
        detail_en: 'Built the brand site for iEnvy by KISS, specializing in false lashes. Configured product variant options and beauty-focused layout.',
        detail_kr: 'iEnvy by KISS 인조 속눈썹 전문 브랜드 사이트 구축. 상품 옵션 구성과 뷰티 중심 레이아웃을 설정했습니다.',
      },
      {
        id: 'c-rubykiss',
        name: 'Ruby Kiss',
        period: '2021~2023',
        tag: 'Ecommerce',
        desc_en: 'Color cosmetics brand site',
        desc_kr: '뷰티 컬러 코스메틱 브랜드 사이트',
        detail_en: 'Developed the Ruby Kiss color cosmetics brand site with shade-based product browsing and promotional campaign layout.',
        detail_kr: 'Ruby Kiss 컬러 코스메틱 브랜드 사이트 개발. 색상 기반 상품 탐색 및 프로모션 캠페인 레이아웃을 구성했습니다.',
      },
      {
        id: 'c-rubykiss-es',
        name: 'Ruby Kiss (ES)',
        period: '2021~2023',
        tag: 'Ecommerce',
        desc_en: 'Spanish-language Ruby Kiss store',
        desc_kr: '스페인어 타겟 Ruby Kiss 별도 스토어',
        detail_en: 'Built a separate Spanish-language store for Ruby Kiss targeting Hispanic US consumers. Localized product descriptions, currency, and shipping rules.',
        detail_kr: '히스패닉 미국 소비자를 위한 스페인어 전용 Ruby Kiss 스토어 구축. 상품 설명, 통화, 배송 규칙을 현지화했습니다.',
      },
      {
        id: 'c-vluxe',
        name: 'VLuxe',
        period: '2021~2023',
        tag: 'Ecommerce',
        desc_en: 'Premium lashes brand site',
        desc_kr: '프리미엄 래쉬 브랜드 사이트',
        detail_en: 'Developed the VLuxe luxury hair extension brand site with premium product presentation and high-end UX layout.',
        detail_kr: 'VLuxe 프리미엄 래쉬 브랜드 사이트 개발. 프리미엄 상품 프레젠테이션과 고급 UX 레이아웃을 구성했습니다.',
      },
      {
        id: 'c-madshade',
        name: 'Mad Shade',
        period: '2021~2023',
        tag: 'Ecommerce',
        desc_en: 'Sunglasses specialist brand site',
        desc_kr: '선글라스 브랜드 사이트',
        detail_en: 'Built the Mad Shade sunglasses brand site with shade filtering, product detail pages, and shade guide content.',
        detail_kr: 'Mad Shade 선글라스 브랜드 사이트 구축. 색상 필터링, 상품 상세 페이지, 색상 가이드 콘텐츠를 구성했습니다.',
      },
      {
        id: 'c-kissgelpro',
        name: 'KISS Gel Pro',
        period: '2021~2023',
        tag: 'Ecommerce',
        desc_en: 'Gel nail specialist brand site',
        desc_kr: '젤 네일 전문 브랜드 사이트',
        detail_en: 'Developed the KISS Gel Pro brand site for professional gel nail products with kit-based product structure and how-to content.',
        detail_kr: 'KISS Gel Pro 젤 네일 전문 브랜드 사이트 개발. 키트 기반 상품 구조와 사용 가이드 콘텐츠를 구성했습니다.',
      },
      {
        id: 'c-kissnypro',
        name: 'KISSNYPro',
        period: '2021~2023',
        tag: 'Ecommerce',
        desc_en: 'Professional nail brand site',
        desc_kr: '프로페셔널 네일 브랜드 사이트',
        detail_en: 'Built the KISSNYPro professional nail brand site with salon-grade product catalog and professional buyer targeting.',
        detail_kr: 'KISSNYPro 프로페셔널 네일 브랜드 사이트 구축. 살롱급 상품 카탈로그와 전문가 구매자 타겟팅을 설정했습니다.',
      },
      {
        id: 'c-goldfinger',
        name: 'Gold Finger',
        period: '2021~2023',
        tag: 'Ecommerce',
        desc_en: 'Nail accessories brand site',
        desc_kr: '네일 액세서리 브랜드 사이트',
        detail_en: 'Developed the Gold Finger nail accessories brand site with accessory collection layout and cross-sell product linking.',
        detail_kr: 'Gold Finger 네일 액세서리 브랜드 사이트 개발. 액세서리 컬렉션 레이아웃과 크로스셀 상품 연결을 구성했습니다.',
      },
      {
        id: 'c-locknlock',
        name: 'Lock & Lock',
        period: '2021~2023',
        tag: 'Ecommerce',
        desc_en: 'Vietnam D2C store',
        desc_kr: 'Vietnam 자사몰 구축',
        detail_en: 'Built the Lock & Lock Vietnam D2C online store on Cafe24. Configured Vietnamese localization, local PG, and 3PL logistics integration.',
        detail_kr: 'Lock & Lock 베트남 자사몰 Cafe24 기반 구축. 베트남 현지화, 로컬 PG, 3PL 물류 연동을 설정했습니다.',
      },
      {
        id: 'c-coway',
        name: 'Coway',
        period: '2021~2023',
        tag: 'Ecommerce',
        desc_en: 'Vietnam D2C store',
        desc_kr: 'Vietnam 자사몰 구축',
        detail_en: 'Developed the Coway Vietnam D2C store for home appliance products. Set up subscription model consideration, product registration, and local payment.',
        detail_kr: 'Coway 베트남 가전제품 자사몰 개발. 구독 모델 검토, 상품 등록, 로컬 결제 설정을 진행했습니다.',
      },
      {
        id: 'c-solgar',
        name: 'Solgar',
        period: '2021~2023',
        tag: 'Ecommerce',
        desc_en: 'Vietnam health supplement store',
        desc_kr: 'Vietnam 건강기능식품 자사몰',
        detail_en: 'Built the Solgar Vietnam health supplement store with ingredient-focused product pages and compliance-aware content structure.',
        detail_kr: 'Solgar 베트남 건강기능식품 자사몰 구축. 성분 중심 상품 페이지와 규정 준수 콘텐츠 구조를 설정했습니다.',
      },
      {
        id: 'c-cjfood',
        name: 'CJ Food',
        period: '2021~2023',
        tag: 'Ecommerce',
        desc_en: 'Vietnam food brand store',
        desc_kr: 'Vietnam 식품 브랜드 자사몰',
        detail_en: 'Developed the CJ Food Vietnam online store with category-based product navigation and Vietnamese market adaptation.',
        detail_kr: 'CJ Food 베트남 자사몰 개발. 카테고리 기반 상품 탐색과 베트남 시장 현지화를 적용했습니다.',
      },
      {
        id: 'c-smbm',
        name: 'SMBM App',
        period: '2021~2023',
        tag: 'Feature',
        desc_en: 'Offline store queue & QA code app',
        desc_kr: '오프라인 매장 대기 앱 & 현장 QA',
        detail_en: 'Developed the SMBM offline store visitor queue management app and on-site QA code purchase feature. Managed requirements, flow design, and QA.',
        detail_kr: '오프라인 매장 방문자 대기 관리 앱 및 현장 QA 코드 구매 기능 개발. 요구사항 정의, 플로우 설계, QA를 담당했습니다.',
      },
      // ─── Migration ─────────────────────────────────
      {
        id: 'c-migration',
        name: 'IVYUSA Full Data Migration',
        period: '2021.10~2022.02',
        tag: 'Migration',
        desc_en: 'Shopify & Cafe24 Full Data Migration',
        desc_kr: 'Shopify & Cafe24 Full Data Migration',
        detail_en: 'Full data migration of major US platform. Migrated all products, options, categories, customers, orders, coupons, content, and media. Reconfigured PG, 3PL, AvaTax, inventory, membership, GA4/GTM integrations. Conducted full QA.',
        detail_kr: '대형 미국 플랫폼의 Shopify & Cafe24 Full Data Migration. 상품·옵션·카테고리·고객·주문·쿠폰·콘텐츠·미디어 전량 이전. PG, 3PL, AvaTax, GA4/GTM 연동 재정비 및 전체 QA 진행.',
      },
      // ─── Technical Setup ───────────────────────────
      {
        id: 'c-powerbi',
        name: 'Power BI',
        period: '2021~2023',
        tag: 'Analytics',
        desc_en: 'Order & sales data dashboard',
        desc_kr: '주문·매출 데이터 시각화 대시보드',
        detail_en: 'Built Power BI dashboard connected to Cafe24 order and sales data for real-time reporting and business insight.',
        detail_kr: 'Cafe24 주문·매출 데이터와 연동된 Power BI 대시보드 구축. 실시간 리포팅 및 비즈니스 인사이트 제공.',
      },
      {
        id: 'c-ga',
        name: 'GA / GTM',
        period: '2021~2023',
        tag: 'Analytics',
        desc_en: 'Ecommerce tracking & conversion setup',
        desc_kr: '이커머스 이벤트 트래킹 및 전환 분석',
        detail_en: 'Configured GA4 and GTM for ecommerce event tracking across multiple brand stores. Set up purchase funnels, conversion goals, and audience segments.',
        detail_kr: '다수 브랜드 스토어에 GA4 및 GTM 이커머스 이벤트 트래킹 설정. 구매 퍼널, 전환 목표, 오디언스 세그먼트를 구성했습니다.',
      },
      {
        id: 'c-tax',
        name: 'Tax / Authorize',
        period: '2021~2023',
        tag: 'Payment',
        desc_en: 'AvaTax setup & Authorize.net PG',
        desc_kr: 'AvaTax 세금 계산 및 Authorize.net 연동',
        detail_en: 'Configured AvaTax for automated US sales tax calculation by state and product category. Integrated Authorize.net as the primary payment gateway.',
        detail_kr: '미국 주별·상품 카테고리별 자동 판매세 계산을 위한 AvaTax 설정. Authorize.net을 주요 결제 게이트웨이로 연동했습니다.',
      },
      {
        id: 'c-pg',
        name: 'PG Integration',
        period: '2021~2023',
        tag: 'Payment',
        desc_en: 'Payment gateway setup & management',
        desc_kr: '결제 게이트웨이 설정 및 운영',
        detail_en: 'Managed payment gateway setup and operational configuration across multiple storefronts. Handled payment error response and reconciliation.',
        detail_kr: '다수 스토어의 결제 게이트웨이 설정 및 운영 관리. 결제 오류 대응 및 정산 처리를 담당했습니다.',
      },
      {
        id: 'c-shipstation',
        name: 'ShipStation',
        period: '2021~2023',
        tag: 'Logistics',
        desc_en: '3PL shipping integration & issue handling',
        desc_kr: '3PL 배송 연동 및 이슈 대응',
        detail_en: 'Integrated ShipStation for 3PL logistics management. Resolved order sync issues, carrier mapping, and shipping rule configuration.',
        detail_kr: 'ShipStation 3PL 물류 연동. 주문 동기화 이슈, 캐리어 매핑, 배송 규칙 설정 문제를 해결했습니다.',
      },
      // ─── Consulting ────────────────────────────────
      {
        id: 'c-incubating',
        name: 'Overseas Incubating',
        period: '2021~2023',
        tag: 'Consulting',
        desc_en: 'Overseas expansion consulting & support',
        desc_kr: '해외 진출 컨설팅 및 지원',
        detail_en: 'Managed incubating services for clients seeking overseas expansion including company establishment, market analysis, IT infrastructure consulting, and platform operation stabilization.',
        detail_kr: '해외 진출을 희망하는 고객사 대상 법인 설립, 시장 분석, IT 인프라 컨설팅, 플랫폼 운영 안정화 지원 등 인큐베이팅 서비스를 관리했습니다.',
      },
    ],
  },
  {
    id: 'cargo',
    name: 'Cargorush',
    period: '2018~2021',
    color: '#8a6f0f',
    projects: [
      { id: 'g1', name: 'Global Import/Export', period: '2018~2021', tag: 'Logistics', desc_en: 'Sea/air import-export operations management', desc_kr: '해상/항공 수출입 운영 관리', detail_en: 'Managed global sea/air import-export operations including freight scheduling, space booking, customs clearance, and overseas partner communication.', detail_kr: '글로벌 해상·항공 수출입 운영 관리. 화물 선적 스케줄, 선복 확보, 통관, 해외 파트너사 커뮤니케이션을 담당했습니다.' },
      { id: 'g2', name: 'Customs & Clearance', period: '2018~2021', tag: 'Customs', desc_en: 'Customs clearance and compliance management', desc_kr: '통관 및 규정 관리', detail_en: 'Handled customs and clearance issues, QCVN certificate issuance, CO issuance, FTA tariff benefits, and Vietnam post-management.', detail_kr: '세관 및 통관 이슈 대응, QCVN 화물 인증서 발급, CO 발급, FTA 관세 혜택, 베트남 수책관리를 담당했습니다.' },
      { id: 'g3', name: 'Warehouse Management', period: '2018~2021', tag: 'Operations', desc_en: 'Warehouse & inventory management', desc_kr: '창고 & 재고 관리', detail_en: 'Managed inbound/outbound and inventory management, product classification, packaging guide management, and inland transportation dispatch.', detail_kr: '입출고 및 재고 관리, 제품 분류 및 포장 가이드 관리, 내륙 운송 배차를 수행했습니다.' },
    ],
  },
]

type Project = {
  id: string
  name: string
  period: string
  tag: string
  desc_en: string
  desc_kr: string
  detail_en: string
  detail_kr: string
}

const tagColors: Record<string, string> = {
  'B2B': '#1a4fd8', 'Feature': '#0f8a5a', 'Platform': '#6a4fd8',
  'Marketing': '#8a2fd8', 'Ecommerce': '#1a8ad8', 'QA': '#0f8a5a',
  'PM': '#d87a1a', 'Migration': '#6a4fd8', 'Consulting': '#8a6f0f',
'Logistics': '#8a6f0f', 'Customs': '#d84040', 'Operations': '#4a8a0f',
'Analytics': '#1a8ad8', 'Payment': '#d87a1a',
}

export default function Career() {
  const [lang, setLang] = useState<'en' | 'kr'>('en')
  const [visible, setVisible] = useState(false)
  const [tab, setTab] = useState<'career' | 'tools'>('career')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<typeof companies[0] | null>(null)
  const [animatedSkills, setAnimatedSkills] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (selectedCompany || selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedCompany, selectedProject])

  useEffect(() => {
    const saved = localStorage.getItem('lp_lang') as 'en' | 'kr'
    if (saved) setLang(saved)
    const handler = (e: Event) => setLang((e as CustomEvent).detail)
    window.addEventListener('langChange', handler)
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          setTimeout(() => setAnimatedSkills(true), 400)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => {
      window.removeEventListener('langChange', handler)
      obs.disconnect()
    }
  }, [])

  const t = (en: string, kr: string) => lang === 'en' ? en : kr

  return (
    <section id="career" className="section-wrap" ref={ref}>
      <div className="container">

        <div style={{ marginBottom: '48px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
          <div className="sys-tag" style={{ marginBottom: '16px' }}>{t('Career', '경력')}</div>
          <h2 style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '32px' }}>
            {t('Experience & Projects', '경력 및 프로젝트')}
          </h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['career', 'tools'] as const).map(tb => (
              <button key={tb} onClick={() => setTab(tb)} style={{
                fontFamily: 'var(--mono)', fontSize: '12px', padding: '8px 20px', borderRadius: '6px',
                background: tab === tb ? 'var(--text-primary)' : 'rgba(255,255,255,0.4)',
                color: tab === tb ? '#e8f0ff' : 'var(--text-muted)',
                border: tab === tb ? 'none' : '0.5px solid var(--border)',
                cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.2s',
              }}>
                {tb === 'career' ? t('Projects', '프로젝트') : t('Tools & Study', '툴 & 학습')}
              </button>
            ))}
          </div>
        </div>

        {tab === 'career' && (
          <div style={{ opacity: visible ? 1 : 0, transition: 'all 0.6s ease 0.2s' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {companies.map((company, ci) => (
                <div
                  key={company.id}
                  onClick={() => setSelectedCompany(company)}
                  className="glass"
                  style={{
                    borderRadius: '12px', padding: '20px', cursor: 'pointer', transition: 'all 0.2s',
                    border: `0.5px solid ${company.color}30`,
                    opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)',
                    transitionDelay: `${ci * 0.1}s`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.55)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: '16px', fontWeight: 500, color: company.color, marginBottom: '4px' }}>{company.name}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-dim)', marginBottom: '16px' }}>{company.period}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                    {company.projects.length} {t('projects', '프로젝트')} →
                  </div>
                </div>
              ))}
            </div>

            {selectedCompany && createPortal(
              <div
                onClick={() => setSelectedCompany(null)}
                style={{ position: 'fixed', inset: 0, zIndex: 998, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(13,26,58,0.4)', backdropFilter: 'blur(8px)' }}
              >
                <div
                  onClick={e => e.stopPropagation()}
                  className="glass"
                  style={{ borderRadius: '18px', padding: '32px 36px', maxWidth: '620px', width: '90%', maxHeight: '75vh', overflowY: 'auto' }}
                >
                  <div className="corner corner-tl" /><div className="corner corner-tr" />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: 400, color: selectedCompany.color, letterSpacing: '-0.02em' }}>{selectedCompany.name}</div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>{selectedCompany.period}</div>
                    </div>
                    <button
                      onClick={() => setSelectedCompany(null)}
                      style={{ fontFamily: 'var(--mono)', fontSize: '12px', padding: '6px 16px', borderRadius: '6px', background: 'rgba(255,255,255,0.4)', border: '0.5px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                      {t('Close', '닫기')}
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedCompany.projects.map(project => (
                      <div
                        key={project.id}
                        onClick={() => { setSelectedCompany(null); setSelectedProject(project) }}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: '12px',
                          padding: '12px 14px', borderRadius: '10px',
                          background: 'rgba(255,255,255,0.45)', border: '0.5px solid var(--border)',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; e.currentTarget.style.transform = 'translateX(3px)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.45)'; e.currentTarget.style.transform = 'translateX(0)' }}
                      >
                        <div style={{ display: 'inline-block', fontFamily: 'var(--mono)', fontSize: '12px', padding: '2px 8px', borderRadius: '3px', background: `${tagColors[project.tag] || '#888'}18`, color: tagColors[project.tag] || '#888', border: `0.5px solid ${tagColors[project.tag] || '#888'}30`, letterSpacing: '0.08em', whiteSpace: 'nowrap', marginTop: '2px' }}>
                          {project.tag}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '3px' }}>{project.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{t(project.desc_en, project.desc_kr)}</div>
                        </div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-dim)', whiteSpace: 'nowrap', marginTop: '2px' }}>{project.period}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>,
              document.body
            )}
          </div>
        )}

        {tab === 'tools' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', opacity: visible ? 1 : 0, transition: 'all 0.6s ease 0.2s' }}>

            <div className="glass" style={{ borderRadius: '14px', padding: '32px' }}>
              <div className="corner corner-tl" /><div className="corner corner-br" />
              <div className="sys-tag" style={{ marginBottom: '24px' }}>{t('Skills', '스킬')}</div>
              {skills.map((skill, i) => (
                <div key={skill.name} style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-muted)' }}>{skill.name}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--accent)', fontWeight: 500 }}>{skill.level}</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(160,185,225,0.25)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: '2px',
                      background: 'linear-gradient(90deg, var(--accent), rgba(26,79,216,0.5))',
                      width: animatedSkills ? `${skill.level}%` : '0%',
                      transition: `width 1.2s ease ${i * 0.1}s`,
                    }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

              <div className="glass" style={{ borderRadius: '14px', padding: '28px' }}>
                <div className="corner corner-tl" />
                <div className="sys-tag" style={{ marginBottom: '16px' }}>{t('Dev Tools', '개발 툴')}</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#0f8a5a', boxShadow: '0 0 5px rgba(15,138,90,0.5)' }} />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-dim)' }}>{t('Completed', '개발 완료')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '12px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#e07b20', boxShadow: '0 0 5px rgba(224,123,32,0.5)' }} />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-dim)' }}>{t('In planning', '개발 예정')}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {devTools.map(tool => (
                    <div key={tool.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.4)', border: '0.5px solid var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0, background: tool.status === 'done' ? '#0f8a5a' : '#e07b20', boxShadow: tool.status === 'done' ? '0 0 6px rgba(15,138,90,0.5)' : '0 0 6px rgba(224,123,32,0.5)' }} />
                        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{tool.name}</span>
                      </div>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)' }}>{t(tool.desc_en, tool.desc_kr)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass" style={{ borderRadius: '14px', padding: '28px' }}>
                <div className="corner corner-tl" />
                <div className="sys-tag" style={{ marginBottom: '20px' }}>{t('Currently Studying', '현재 학습 중')}</div>
                {studyItems.map(s => (
                  <div key={s.category_en} style={{ marginBottom: '16px' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: '8px' }}>
                      {t(s.category_en, s.category_kr)}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {s.items.map(item => (
                        <span key={item.en} style={{ fontFamily: 'var(--mono)', fontSize: '11px', padding: '4px 12px', borderRadius: '4px', background: 'rgba(255,255,255,0.5)', border: '0.5px solid var(--border)', color: 'var(--text-muted)' }}>
                          {lang === 'en' ? item.en : item.kr}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}
      </div>

      {selectedProject && createPortal(
        <div onClick={() => setSelectedProject(null)} style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(13,26,58,0.5)', backdropFilter: 'blur(10px)' }}>
          <div onClick={e => e.stopPropagation()} className="glass" style={{ borderRadius: '18px', padding: '40px 44px', maxWidth: '580px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }}>
            <div className="corner corner-tl" /><div className="corner corner-tr" />
            <div className="corner corner-br" /><div className="corner corner-bl" />
            <div style={{ display: 'inline-block', fontFamily: 'var(--mono)', fontSize: '10px', padding: '3px 10px', borderRadius: '3px', background: `${tagColors[selectedProject.tag] || '#888'}18`, color: tagColors[selectedProject.tag] || '#888', border: `0.5px solid ${tagColors[selectedProject.tag] || '#888'}30`, letterSpacing: '0.08em', marginBottom: '16px' }}>
              {selectedProject.tag}
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.02em' }}>{selectedProject.name}</h3>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)', marginBottom: '24px' }}>{selectedProject.period}</div>
            <div style={{ width: '100%', height: '180px', borderRadius: '10px', background: 'rgba(255,255,255,0.3)', border: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>{t('[ Image placeholder ]', '[ 이미지 영역 ]')}</span>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '28px' }}>{t(selectedProject.detail_en, selectedProject.detail_kr)}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)' }}>{t('Link coming soon', '링크 추후 추가')}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => { setSelectedProject(null); setSelectedCompany(companies.find(c => c.projects.some(p => p.id === selectedProject.id)) || null) }} style={{ fontFamily: 'var(--mono)', fontSize: '12px', padding: '8px 20px', borderRadius: '6px', background: 'rgba(255,255,255,0.4)', border: '0.5px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer', letterSpacing: '0.08em' }}>
                  {t('← Back', '← 뒤로')}
                </button>
                <button onClick={() => setSelectedProject(null)} style={{ fontFamily: 'var(--mono)', fontSize: '12px', padding: '8px 20px', borderRadius: '6px', background: 'rgba(255,255,255,0.4)', border: '0.5px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer', letterSpacing: '0.08em' }}>
                  {t('Close', '닫기')}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}
