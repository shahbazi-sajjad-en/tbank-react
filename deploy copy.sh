#!/bin/bash

# رنگ‌ها برای نمایش زیباتر
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# تنظیمات سرور Docker Registry
DOCKER_REGISTRY="docker.ham-sun.com"
DOCKER_REPOSITORY="docker-hosted"
DOCKER_USERNAME="m.bazrafshan"
DOCKER_PASSWORD="m.bazrafshan"

# تابع برای نمایش کمک
show_help() {
    echo -e "${GREEN}استفاده از اسکریپت deploy:${NC}"
    echo -e "  ./deploy.sh [options]"
    echo -e ""
    echo -e "${YELLOW}آپشن‌ها:${NC}"
    echo -e "  -i, --id [IDENTIFIER]    شناسه یکتا برای داکر (اجباری)"
    echo -e "  -e, --email [EMAIL]      ایمیل برای ساخت image (اختیاری)"
    echo -e "  -p, --port [PORT]        پورت برای اجرا (پیش‌فرض: 8090)"
    echo -e "  -h, --help               نمایش این راهنما"
    echo -e ""
    echo -e "${BLUE}مثال:${NC}"
    echo -e "  ./deploy.sh -i myapp -e my@email.com -p 8080"
    echo -e "  ./deploy.sh --id production --email admin@company.com"
}

# متغیرهای پیش‌فرض
IDENTIFIER=""
EMAIL=""
PORT="8090"
IMAGE_NAME=""
CONTAINER_NAME=""
REMOTE_IMAGE_NAME=""

# تابع برای لاگ
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

debug() {
    echo -e "${CYAN}[DEBUG]${NC} $1"
}

# تابع بررسی وضعیت Docker Daemon
check_docker_daemon() {
    if ! docker info > /dev/null 2>&1; then
        error "Docker Daemon در حال اجرا نیست! لطفا Docker Desktop را اجرا کنید."
        exit 1
    fi
    log "Docker Daemon در حال اجرا است ✓"
}

# تابع فعال‌سازی BuildKit
enable_buildkit() {
    export DOCKER_BUILDKIT=1
    export COMPOSE_DOCKER_CLI_BUILD=1
    log "BuildKit فعال شد ✓"
}

# تابع بررسی وجود Docker
check_docker() {
    if ! command -v docker &> /dev/null; then
        error "Docker نصب نیست! لطفا ابتدا Docker را نصب کنید."
        exit 1
    fi
    log "Docker پیدا شد ✓"
    
    check_docker_daemon
    enable_buildkit
}

# تابع ایجاد فایل .dockerignore
create_dockerignore() {
    if [ ! -f ".dockerignore" ]; then
        cat > .dockerignore << EOF
node_modules
npm-debug.log
.next
.git
.env
Dockerfile
.dockerignore
README.md
*.log
.DS_Store
Thumbs.db
.idea
.vscode
EOF
        log "فایل .dockerignore ایجاد شد ✓"
    fi
}

# تابع بررسی اتصال به سرور Docker Registry
check_registry_connection() {
    log "بررسی اتصال به سرور Docker Registry..."
    
    if docker login $DOCKER_REGISTRY -u $DOCKER_USERNAME -p $DOCKER_PASSWORD &> /dev/null; then
        log "اتصال به Docker Registry موفق ✓"
    else
        error "خطا در اتصال به Docker Registry"
        error "لطفا بررسی کنید:"
        error "  - اتصال اینترنت"
        error "  - نام کاربری و رمز عبور"
        error "  - آدرس سرور: $DOCKER_REGISTRY"
        exit 1
    fi
}

# تابع بررسی پارامترها
validate_parameters() {
    if [ -z "$IDENTIFIER" ]; then
        error "شناسه الزامی است. از -i یا --id استفاده کنید."
        show_help
        exit 1
    fi
    
    # ساخت نام image و container بر اساس شناسه
    IMAGE_NAME="${IDENTIFIER}-nextjs-app:latest"
    REMOTE_IMAGE_NAME="${DOCKER_REGISTRY}/${DOCKER_REPOSITORY}/${IMAGE_NAME}"
    CONTAINER_NAME="${IDENTIFIER}-nextjs-container"
    
    log "شناسه: $IDENTIFIER"
    log "ایمیل: ${EMAIL:-'استفاده از شناسه'}"
    log "پورت: $PORT"
    log "نام Image محلی: $IMAGE_NAME"
    log "نام Image ریموت: $REMOTE_IMAGE_NAME"
    log "نام Container: $CONTAINER_NAME"
}

# تابع ساخت ایمیل خودکار
generate_email() {
    if [ -z "$EMAIL" ]; then
        EMAIL="${IDENTIFIER}-app@ham-sun.com"
        warning "ایمیل تنظیم نشده. استفاده از: $EMAIL"
    fi
}

# تابع ساخت Docker image با BuildKit
build_image() {
    log "در حال ساخت Docker Image با BuildKit..."
    
    # بررسی وجود Dockerfile
    if [ ! -f "Dockerfile" ]; then
        error "فایل Dockerfile یافت نشد!"
        exit 1
    fi
    
    # بررسی وجود package.json
    if [ ! -f "package.json" ]; then
        error "فایل package.json یافت نشد!"
        exit 1
    fi
    
    create_dockerignore
    
    # ساخت image با BuildKit
    log "شروع فرآیند build..."
    if DOCKER_BUILDKIT=1 docker build \
        --progress=plain \
        --tag $IMAGE_NAME \
        --tag $REMOTE_IMAGE_NAME \
        --label "app.identifier=$IDENTIFIER" \
        --label "app.email=$EMAIL" \
        --label "app.build-date=$(date -Iseconds)" \
        --label "app.registry=$DOCKER_REGISTRY" \
        --build-arg BUILDKIT_INLINE_CACHE=1 \
        .; then
        
        log "Docker Image با موفقیت ساخته شد ✓"
    else
        error "خطا در ساخت Docker Image"
        error "مشکل احتمالی:"
        error "  - فایل‌های سیستم مانند .DS_Store"
        error "  - مشکل در Dockerfile"
        error "  - کمبود فضای دیسک"
        error "  - مشکل در وابستگی‌های npm"
        exit 1
    fi
}

# تابع آپلود image به سرور
upload_image() {
    log "در حال آپلود Image به سرور Docker Registry..."
    
    if docker push $REMOTE_IMAGE_NAME; then
        log "Image با موفقیت آپلود شد ✓"
    else
        error "خطا در آپلود Image به سرور"
        warning "ادامه عملیات با image محلی..."
    fi
}

# تابع pull image از سرور (برای اطمینان)
pull_image() {
    log "بررسی pull image از سرور..."
    
    if docker pull $REMOTE_IMAGE_NAME; then
        log "Image با موفقیت از سرور pull شد ✓"
    else
        warning "خطا در pull image از سرور، استفاده از image محلی"
    fi
}

# تابع توقف container قبلی
stop_previous_container() {
    if docker ps -a --filter "name=$CONTAINER_NAME" | grep -q $CONTAINER_NAME; then
        log "توقف container قبلی: $CONTAINER_NAME"
        docker stop $CONTAINER_NAME > /dev/null 2>&1 || true
        docker rm $CONTAINER_NAME > /dev/null 2>&1 || true
        log "Container قبلی حذف شد ✓"
    fi
}

# تابع اجرای container جدید
run_container() {
    log "در حال اجرای Container جدید..."
    
    # اولویت با image ریموت، اگر مشکل داشت از image محلی استفاده کن
    local image_to_use=$REMOTE_IMAGE_NAME
    
    # بررسی وجود image ریموت
    if ! docker image inspect $REMOTE_IMAGE_NAME > /dev/null 2>&1; then
        warning "Image ریموت یافت نشد، استفاده از image محلی"
        image_to_use=$IMAGE_NAME
    fi
    
    # بررسی پورت
    if netstat -an | grep -q ":$PORT .*LISTEN"; then
        warning "پورت $PORT در حال استفاده است، ممکن است باعث خطا شود"
    fi
    
    if docker run -d \
        --name $CONTAINER_NAME \
        -p $PORT:8090 \
        -e NODE_ENV=production \
        -e APP_IDENTIFIER=$IDENTIFIER \
        -e APP_EMAIL=$EMAIL \
        -e DOCKER_REGISTRY=$DOCKER_REGISTRY \
        --restart unless-stopped \
        $image_to_use; then
        
        log "Container با موفقیت اجرا شد ✓"
        log "Image استفاده شده: $image_to_use"
    else
        error "خطا در اجرای Container"
        exit 1
    fi
}

# تابع بررسی وضعیت
check_status() {
    log "بررسی وضعیت Container..."
    sleep 5
    
    if docker ps --filter "name=$CONTAINER_NAME" | grep -q $CONTAINER_NAME; then
        log "✅ Container در حال اجرا است"
        
        # نمایش اطلاعات
        local container_ip=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $CONTAINER_NAME 2>/dev/null || echo "N/A")
        local image_used=$(docker inspect -f '{{.Config.Image}}' $CONTAINER_NAME 2>/dev/null || echo "N/A")
        
        log "📦 نام Container: $CONTAINER_NAME"
        log "🖼️  Image استفاده شده: $image_used"
        log "🌐 آدرس دسترسی: http://localhost:$PORT"
        if [ "$container_ip" != "N/A" ]; then
            log "🔗 آدرس داخلی: http://${container_ip}:8090"
        fi
        log "🆔 شناسه: $IDENTIFIER"
        log "📧 ایمیل: $EMAIL"
        log "🏢 سرور Registry: $DOCKER_REGISTRY"
        
        # لاگ‌های اخیر
        info "نمایش ۱۰ خط آخر لاگ‌ها:"
        docker logs --tail 10 $CONTAINER_NAME
        
    else
        error "❌ Container اجرا نشد"
        error "دریافت لاگ‌های خطا:"
        docker logs $CONTAINER_NAME || true
        exit 1
    fi
}

# تابع نمایش اطلاعات سرور
show_registry_info() {
    info "📋 اطلاعات سرور Docker Registry:"
    info "   آدرس: $DOCKER_REGISTRY"
    info "   repository: $DOCKER_REPOSITORY"
    info "   کاربر: $DOCKER_USERNAME"
    info "   پروژه: $IDENTIFIER"
}

# تابع تمیزکاری
cleanup() {
    info "تمیزکاری منابع قدیمی..."
    
    # حذف containerهای متوقف شده
    docker container prune -f > /dev/null 2>&1 || true
    
    # حذف imageهای بدون نام
    docker image prune -f > /dev/null 2>&1 || true
    
    # خروج از Docker Registry (اختیاری)
    docker logout $DOCKER_REGISTRY &> /dev/null && log "از Registry خارج شد ✓" || true
}

# تابع اصلی
main() {
    log "شروع عملیات deploy با شناسه: $IDENTIFIER"
    
    check_docker
    validate_parameters
    generate_email
    show_registry_info
    check_registry_connection
    build_image
    upload_image
    # pull_image  # غیرفعال به دلیل مشکلات احتمالی
    stop_previous_container
    run_container
    check_status
    cleanup
    
    log "✅ عملیات deploy با موفقیت completed!"
    echo -e "${GREEN}"
    echo "┌──────────────────────────────────────────────────┐"
    echo "│               🚀 Deploy Successful!             │"
    echo "├──────────────────────────────────────────────────┤"
    echo "│ 📦 Container: $CONTAINER_NAME"
    echo "│ 🌐 Port: $PORT (external) -> 8090 (internal)"
    echo "│ 🆔 ID: $IDENTIFIER"
    echo "│ 📧 Email: $EMAIL"
    echo "│ 🏢 Registry: $DOCKER_REGISTRY"
    echo "│ 🔗 URL: http://localhost:$PORT"
    echo "└──────────────────────────────────────────────────┘"
    echo -e "${NC}"
}

# پردازش آرگومان‌های خط فرمان
while [[ $# -gt 0 ]]; do
    case $1 in
        -i|--id)
            IDENTIFIER="$2"
            shift 2
            ;;
        -e|--email)
            EMAIL="$2"
            shift 2
            ;;
        -p|--port)
            PORT="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            error "آپشن ناشناخته: $1"
            show_help
            exit 1
            ;;
    esac
done

# اجرای تابع اصلی
main